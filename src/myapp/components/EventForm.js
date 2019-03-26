import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import api from '../api';

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    height: 40,
    // borderWidth: 1,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 0.5,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

const EventForm = (props) => {
  // Declare a new state variables
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Similar to componentDidMount
  useEffect(() => {
    
  }, []);

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
    try
    {
      const event = {
        title:title,
        date:date
      };

      await api.saveEvent(event);
      props.navigation.goBack();
    }
    catch (e) {
      console.error(e);
    }
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

export default EventForm;