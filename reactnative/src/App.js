import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@firebase/app';

class App extends Component {
  // initialise firebase app when main app initialises
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAwegGBozZMVtyNy72JWgv2RGu6zZzzmhQ',
      authDomain: 'checkit-6682c.firebaseapp.com',
      databaseURL: 'https://checkit-6682c.firebaseio.com',
      projectId: 'checkit-6682c',
      storageBucket: 'checkit-6682c.appspot.com',
      messagingSenderId: '708556627645'
    };
    firebase.initializeApp(config);
  }
  
  render() {
    return (
      <View>
        <Text>
          we gonna win atos
        </Text>
      </View>
    );
  }
}

export default App;