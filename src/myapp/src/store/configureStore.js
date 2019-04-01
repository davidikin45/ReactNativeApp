import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import Reactotron from '../config/ReactotronConfig'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './combineReducers'
import {initSagas} from './initSagas';

//https://redux.js.org/recipes/configuring-your-store
//Middleware adds extra functionality to the Redux dispatch function
//enhancers add extra functionality to the Redux store.

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

// create our new saga monitor
const sagaMonitor = Reactotron.createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const middleware = [
    thunk,
    sagaMiddleware
];

const enhancers = [];

if (__DEV__) {
    console.log('Running in Development Mode');
    
    const immutableState = require('redux-immutable-state-invariant').default();
    middleware.push(immutableState);

    //logger must be last middleware
    const logger = createLogger({collapsed: true});
    middleware.push(logger);

    const middlewareEnhancer = applyMiddleware(...middleware);

    //remote redux dev tools
    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

    //http://remotedev.io/local/
    //const composeEnhancers = composeWithDevTools();

    const reactotronEnhancer = Reactotron.createEnhancer();

    const devToolsEnhancer = composeEnhancers(middlewareEnhancer, reactotronEnhancer);

    enhancers.push(devToolsEnhancer);
}
else
{
    const middlewareEnhancer = applyMiddleware(...middleware);
    enhancers.push(middlewareEnhancer);
}

export default function configureStore(initialState = {}) {

    const composedEnhancers = compose(...enhancers);

    const store = createStore(
        persistedReducer,
        initialState,
        composedEnhancers
    );

    const persistor =  persistStore(store);

    initSagas(sagaMiddleware);

    return {store, persistor};
}