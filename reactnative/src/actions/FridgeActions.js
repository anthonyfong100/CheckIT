import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Actions } from 'react-native-router-flux';
import {
    FRIDGE_FOOD_CREATE,
    FRIDGE_FOOD_FETCH_SUCCESS
} from './types';
import { FirebaseError } from '@firebase/util';

export const frideFoodCreate = ({ name, expiry }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFood`)
        .push({ name, expiry })
        .then(() => {
            dispatch({ type: FRIDGE_FOOD_CREATE })
            Actions.pop({ type: 'reset' });
        });
    };
};

export const fridgeFoodFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFood`)
        .on('value', snapshot => {
            dispatch({ type: FRIDGE_FOOD_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const fridgeFoodDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        FirebaseError.database().ref(`/user/${currentUser.uid}/fridgeFood/${uid}`)
        .remove()
        .then(() => {
            Actions.myFridge({ type: 'reset' });
        });
    };
};