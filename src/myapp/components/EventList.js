import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import ActionButton from 'react-native-action-button';

import EventCard from './EventCard';
import api from '../api';

const EventList = (props) =>  {
    const [tick, setTick] = useState('');
    const [events, setEvents] = useState([]);

    fetchData = async () => {
        try
        {
          const events = await api.getEvents();
          setEvents(events);
        }
        catch (e) {
          console.error(e);
        }
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

          props.navigation.addListener('didFocus', () => {             
            fetchData();
          });
    }, []);

    handleAddEvent = () =>{
        props.navigation.navigate('form');
    }

    return [
        <FlatList
        key="flatlist"
        data={events}
        extraData={tick}
        renderItem={({item}) => <EventCard event={item}/>}
        keyExtractor={item => item.id}
        />,
        <ActionButton key="fab"
            onPress={handleAddEvent}
            buttonColor="rgba(231, 76, 60, 1)"></ActionButton>
    ]
}

export default EventList;