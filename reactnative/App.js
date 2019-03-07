import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { firebase as fbase } from '@firebase/app';
import firebase from 'react-native-firebase';

import { MyNavigator } from './src/navigation/Navigator';
import reducers from './src/reducers';

// import PushNotification from 'react-native-push-notification';
// import PushController from './src/PushController';

class App extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {

    };
  }
  */

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
    fbase.initializeApp(config);
  }
  /*
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {

  }
  */

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
          <MyNavigator />
          {/* <PushController /> */}
        </Provider>
    );
  }
}

 export default App;