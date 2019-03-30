import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './combineReducers'
import {initSagas} from './initSagas';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    thunk,
    sagaMiddleware
];

const enhancers = [];

if (__DEV__) {
    console.log('Running in Development Mode');
    
    const immutableState = require('redux-immutable-state-invariant').default();
    middleware.push(immutableState);

    //logger must be last
    const logger = createLogger({collapsed: true});
    middleware.push(logger);

    //remote redux dev tools
    enhancers.push(composeWithDevTools({ hostname:'localhost', port: 8000 })(applyMiddleware(...middleware)));

     //http://remotedev.io/local/
    //enhancers.push(composeWithDevTools(applyMiddleware(...middleware)));
}
else
{
    enhancers.push(applyMiddleware(...middleware));
}

export default function configureStore(initialState = {}) {

    const store = createStore(
        persistedReducer,
        initialState,
        compose(...enhancers)
    );

    const persistor =  persistStore(store);

    initSagas(sagaMiddleware);

    return {store, persistor};
}