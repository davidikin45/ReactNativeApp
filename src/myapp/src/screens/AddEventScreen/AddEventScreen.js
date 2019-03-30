import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import api from '../../api';

import styles from './AddEventScreenStyle';
import { addEvent } from '../../store/state/Event/actions';

const AddEventScreen = (props) => {
  // Declare a new state variables
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const prevSuccess = usePrevious(props.success);
  
  // Similar to componentDidMount
  useEffect(() => {

  }, []);

  useEffect(() => {
    if(prevSuccess != null && prevSuccess !== props.success && props.success)
    {
      props.navigation.goBack();
    }
  });

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  handleChangeTitle = (text) => {
    setTitle(text);
  }

  handleDatePicked = (date) => {
    setDate(date);

    this.handleDatePickerHide();
  }

  handleDatePickerHide = () => {
    setShowDatePicker(false);
  }

  handleDatePress = () => {
    setShowDatePicker(true);
  }

  handleAddPress =  async () => {
    // try
    // {
    //   const event = {
    //     title:title,
    //     date:date
    //   };

    //   this.props.AddEvent(event);

    //   await api.saveEvent(event);
    //   props.navigation.goBack();
    // }
    // catch (e) {
    //   console.error(e);
    // }

    const event = {
      title:title,
      date:date
    };

    props.addEvent(event);
  }
  
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.text}
          onChangeText={handleChangeTitle}
          placeholder="Event title"
          spellCheck={false}
          value={title}
        />
        <TextInput
          style={[styles.text, styles.borderTop]}
          placeholder="Event date"
          spellCheck={false}
          value={api.formatDateTime(date.toString())}
          editable={!showDatePicker}
          onFocus={handleDatePress}
        />
        <DateTimePicker
          isVisible={showDatePicker}
          mode="datetime"
          onConfirm={handleDatePicked}
          onCancel={handleDatePickerHide}
        />
      </View>

      <TouchableHighlight
        onPress={handleAddPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.request.success
  }
};

const mapDispatchToProps = {
  addEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AddEventScreen, api.client));;