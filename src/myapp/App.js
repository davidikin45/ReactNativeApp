
import React, {Component} from 'react';
import {Platform} from 'react-native';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const MainNavigator = createStackNavigator({
    list: {screen: EventList,  navigationOptions:() => ({
      title: 'Your Events'
    })},
    form: {screen: EventForm,  navigationOptions:() => ({
      title: 'Add an event'
    })},
  });
  
const App = createAppContainer(MainNavigator);

export default App;