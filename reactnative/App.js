import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from '@firebase/app';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { SafeAreaView } from 'react-native';
import { MyNavigator } from './src/navigation/Navigator';

class App extends React.Component {
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
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    // const Layout = MyNavigator;

    return (
        <Provider store={store}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <MyNavigator />
          </SafeAreaView>
        </Provider>
    );
  }
}

 export default App;