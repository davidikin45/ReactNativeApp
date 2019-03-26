# Getting Started with React Native

## Install Node.js, JDK, Python 2, expo-cli & react-native-cli

* [Getting Started with Expo CLI and React Native CLI](https://facebook.github.io/react-native/docs/getting-started)

1. [Node.js](https://nodejs.org/en/).
2. Install JDK and Python 2 using [Chocolatey](https://chocolatey.org/).
```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
choco install -y python2 jdk8
```
3. Install expo-cli & react-native-cli
```
npm install -g expo-cli
npm install -g react-native-cli
```
4. Install [Android Studio](https://developer.android.com/studio/) following the instructions [Building Projects with Native Code](https://facebook.github.io/react-native/docs/getting-started) documentation.
5. On phone download 'Expo' app.
6. Add the ANDROID_HOME user variable
```
c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
```
7. Add platform-tools to user Path variable
```
c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools
```

## Setting up a new project
* [New React Native App](https://levelup.gitconnected.com/expo-vs-react-native-cli-a-guide-to-bootstrapping-new-react-native-apps-6f0fcafee58f)

1.
```
react-native init myapp
cd myapp
npm install --save react-navigation react-native-gesture-handler react-native-action-button react-native-modal-datetime-picker
react-native link react-native-gesture-handler
```
2. Open the android folder in Android Studio
3. Open Tools > Android > AVD Manager
4. Create new Virtual Device OR Settings > About phone > Sotware information > Build number x7, Enable Settings > Developer Options > USB debugging, ADB WiFi Connect
5. Launch virtual device
![alt text](virtual-device.jpg "Virtual Device")
6. In terminal run the following commands
```
cd myapp
npm start -- --reset-cache
```

```
cd myapp
react-native run-android
```

## About
* iOS - Swift or Obj-Chocolatey
* Android - Java or Kotlin
* [Ionic](https://ionicframework.com/) renders HTML in app container. Classified as hybrid rather than native mobile app. 
* [Flutter](https://flutter.dev/)
* Best to use react-native rather than expo-cli. Allows native iOS and Android modules.

## Learning React, Redux Thunk & Redux Saga
[Pluralsight Free Subscription](https://devopscube.com/pluralsight-free-subscription/)

0. [React.js: Getting Started](https://www.pluralsight.com/courses/react-js-getting-started)
1. [A Practical Start with React](https://app.pluralsight.com/library/courses/react-practical-start)
2. [Redux Thunk Fundamentals](https://app.pluralsight.com/library/courses/redux-fundamentals/table-of-contents)
3. [Redux Saga](https://app.pluralsight.com/library/courses/redux-saga/table-of-contents)

## React Native Stateful Component
```
import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

class EventList extends Component {
    render()
    {
        return (
            <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
            />
        )
    }
}

export default EventList;
```
## React Native Stateful Component with Hooks
```
import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';

import EventCard from './EventCard';

const EventList = (props) =>  {
    const [events, setEvents] = useState([]);

    async function fetchMyAPI() {
      try
      {
        let url = 'http://something';
        let config = {};
        const response = await myFetch(url);
      }
      catch (e) {
        console.error(e);
      }
    }

    useEffect(() => {
      fetchMyAPI();
    }, []);

    useEffect(() => {
        setInterval(() => {
            setEvents(events.map(evt => ({
                ...evt,
                timer: Date.now(),
              })));
          }, 1000);

        const events = require('./db.json').events.map(e => ({
            ...e,
            date: new Date(e.date),
          }));
          setEvents(events);
    }, []);

    return (
        <FlatList
        data={events}
        renderItem={({item}) => <EventCard event={item}/>}
        keyExtractor={item => item.id}
        />
    )
}

export default EventList;
```
```
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  
  // Similar to componentDidMount
  useEffect(() => {
    
  }, []);
  
  return (
    <Text>Hello</Text>
  );
}

export default Example;
```

## React Native Stateless Component
```
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
   cardHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  date: {
    fontWeight: '200',
    fontSize: 15,
    color: '#bdbdbd',
    width: '30%',
    textAlign: 'right',
  },
  title: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 7,
    textAlign: 'left',
  }
};

export default function EventCard({ event }) {
  return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.date}>{formatDate(event.date)}</Text>
            <Text style={styles.title}>{event.title}</Text>
        </View>
      </View>
  )
};

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date)
  }),
};
```

## Hooks

* Hooks don’t work inside classes — they let you use React without classes
* useState returns a pair: the current state value and a function that lets you update it.
* The only argument to useState is the initial state.
* The state here doesn’t have to be an object — although it can be if you want. The initial state argument is only used during the first render.
* The Effect Hook, useEffect, adds the ability to perform side effects from a function component. 
* Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. 
* In a class component we use {this.state.count} but in a function component (aka stateless component) we just use {count}.
* In a class component we use this.setState({ count: this.state.count + 1 } but in a function component (aka stateless component) we just use setCount(count + 1).

```
import React, { useState, useEffect } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  
   fetchMyAPI = async () => {
      try
      {
        let url = 'http://something';
        let config = {};
        const response = await myFetch(url);
      }
      catch (e) {
        console.error(e);
      }
    }

  // Similar to componentDidMount
  useEffect(() => {
    fetchMyAPI();
  }, []);
  
  // Similar to componentDidUpdate
  useEffect(() => {
    
  }, [count]);
  
  // Combination of componentDidMount, componentDidUpdate and ComponentWillUnmount:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
```
import React, { useState, useEffect } from 'react';

const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

   fetchMyAPI = async () => {
      try
      {
        let url = 'http://something';
        let config = {};
        const response = await myFetch(url);
      }
      catch (e) {
        console.error(e);
      }
    }
  
  // Similar to componentDidMount
  useEffect(() => {
    fetchMyAPI();
  }, []);
  
  // Similar to componentDidUpdate
  useEffect(() => {
    
  }, [count]);
  
  // Combination of componentDidMount, componentDidUpdate and ComponentWillUnmount:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Navigation
```
npm install --save react-navigation react-native-gesture-handler react-native-action-button react-native-modal-datetime-picker
react-native link react-native-gesture-handler
```
```
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
```
```
props.navigation.navigate('form');
```

```
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
          console.error(e);s
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
        renderItem={({item}) => <EventCard fetching={fetching} event={item}/>}
        keyExtractor={item => item.id}
        />,
        <ActionButton key="fab"
            onPress={handleAddEvent}
            buttonColor="rgba(231, 76, 60, 1)"></ActionButton>
    ]
}

export default EventList;
```

## Api with Fetch
* [Using Fetch](https://facebook.github.io/react-native/docs/network)
* The XMLHttpRequest API is built in to React Native. This means that you can use third party libraries such as frisbee or axios that depend on it, or you can use the XMLHttpRequest API directly if you prefer.

```
import api from '../api';

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
	  fetchData();
}, []);
```

```
class Api {
	async getEvents() {
          let response = await fetch('http://localhost:3000/events');
          let responseJson = await response.json();
          return responseJson;
	}
}

export default new Api();
```

## json-server
* [json-server](https://github.com/typicode/json-server)
* [http://localhost:3000](http://localhost:3000/)

```
npm install -g json-server
```
```
json-server db.json
json-server --host 0.0.0.0 db.json
```

## .NET Fake JSON Server
* [.NET Fake JSON Server](https://github.com/ttu/dotnet-fake-json-server)

```
git clone https://github.com/ttu/dotnet-fake-json-server.git

dotnet run --file data.json --urls http://localhost:3000
dotnet run --file data.json --urls http://0.0.0.0:3000
```

## Deployment
* [Fastlane deployment](https://fastlane.tools/)

## Authors

* **David Ikin**