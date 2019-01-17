import React, { Component } from 'react';
import { Provider, Text, View } from 'react-redux';
import firebase from '@firebase/app';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Tabs } from './src/NavBar';
import { SafeAreaView } from 'react-native';

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
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        
        // <Provider store={store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
          <Tabs />
        </SafeAreaView>
        // </Provider>
    );
  }
}

 export default App;