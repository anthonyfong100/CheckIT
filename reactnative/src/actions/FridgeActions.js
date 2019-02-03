import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { FirebaseError } from '@firebase/util';
import { Actions } from 'react-native-router-flux';
import {
    FRIDGE_FOOD_CREATE,
    FRIDGE_FOOD_FETCH_SUCCESS,
    FRIDGE_FOOD_UPDATE,
    FRIDGE_FOOD_SAVE_SUCCESS
} from './types';

export const fridgeFoodUpdate = ({ prop, value }) => {
    return {
        type: FRIDGE_FOOD_UPDATE,
        payload: { prop, value }
    };
};

export const fridgeFoodCreate = ({ name, expiry }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFoods`)
        .push({ name, expiry })
        .then(() => {
            dispatch({ type: FRIDGE_FOOD_CREATE })
            // Actions.pop({ type: 'reset' }); need an action to reset the blank
        });
    };
};

export const fridgeFoodFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFoods/`)
        .on('value', snapshot => {
            dispatch({ type: FRIDGE_FOOD_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const fridgeFoodSave = ({ name, expiry, uid }) =>{
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFoods/${uid}`)
        .set({ name, expiry })
        .then(() => {
            dispatch({ type: FRIDGE_FOOD_SAVE_SUCCESS });
            // need an action to reset the blank
        })
    }
}

export const fridgeFoodDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFoods/${uid}`)
        .remove();
    };
};