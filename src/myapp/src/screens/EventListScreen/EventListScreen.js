import React, { useState, useEffect, } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import api from '../../api';

import EventCard from '../../components/Event/EventCard/EventCard';
import styles from './EventListScreen.module';
import { getEvents } from '../../store/state/Event/actions';
import {mappedEventsSelector} from '../../store/state/Event/selectors';


const EventListScreen = (props) =>  {
    const [tick, setTick] = useState('');

    fetchData = async () => {
        props.getEvents();
      }

    useEffect(() => {
        //const events = require('../db.json').events.map(e => ({
            //...e,
            //date: new Date(e.date),
          //}));
          //setEvents(events);

          setInterval(() => {
            setTick(Date.now());
          }, 1000);

          fetchData();
          props.navigation.addListener('didFocus', () => {           
            fetchData();
          });
    }, []);



    handleAddEvent = () =>{
        props.navigation.navigate('AddEvent');
    }

    return [
        <FlatList
        key="flatlist"
        data={props.events}
        extraData={tick}
        renderItem={({item}) => <EventCard event={item}/>}
        keyExtractor={item => item.id}
        />,
        <ActionButton key="fab"
            onPress={handleAddEvent}
            buttonColor="rgba(231, 76, 60, 1)"></ActionButton>
    ]
}

const mapStateToProps = (state) => {
  return {
    events: mappedEventsSelector(state),
  }
};

const mapDispatchToProps = {
  getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EventListScreen, api.client));