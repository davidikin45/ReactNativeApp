
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from "./store/configureStore";
const storeAndPersistor = configureStore({});
import { MainNavigator } from './navigators';
  
class App extends React.Component {
  render() {
    return (
    <Provider store={storeAndPersistor.store}>
      <PersistGate loading={null} persistor={storeAndPersistor.persistor}>
        <MainNavigator/>
      </PersistGate>
    </Provider>
    );
  }
}

export default App;