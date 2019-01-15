import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from '@firebase/app';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Router from './Router';

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
    console.log(ReduxThunk);
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    console.log("fell through");
    return (
        <Provider store={store}>
          <Router />
        </Provider>
    );
  }
}

export default App;