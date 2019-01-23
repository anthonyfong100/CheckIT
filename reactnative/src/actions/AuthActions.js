// controls actions for authentication, makes async auth() requests to firebase

import firebase from '@firebase/app';
import '@firebase/auth';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';



// action for changing typing email in login form
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};


// action for typing password in login form
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};


// action for user trying to login (posts to firebase database)
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch((error) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
        });
    };
};

// action for fb authentication registering to firebase
//TODO fb registration not working
export const loginUserFb = (credential) => {
    return (dispatch) => {
        console.log(credential)
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    }
}


// action for login user fail
export const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

// action for login user success
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};