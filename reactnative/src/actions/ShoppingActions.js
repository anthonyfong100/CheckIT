import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import {
    SHOPPING_FOOD_CREATE,
    SHOPPING_FOOD_FETCH_SUCCESS,
    SHOPPING_FOOD_UPDATE,
    SHOPPING_FOOD_SAVE_SUCCESS
} from './types';

export const shoppingFoodUpdate = ({ prop, value }) => {
    return {
        type: SHOPPING_FOOD_UPDATE,
        payload: { prop, value }
    };
};

export const shoppingFoodCreate = ({ name }) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/shoppingFoods/`)
        .push({ name })
        .then(() => {
            dispatch({ type: SHOPPING_FOOD_CREATE })
            // Actions.pop({ type: 'reset' }); how to set to blank without router?
        });
    };
};

export const shoppingFoodFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/shoppingFoods/`)
        .on('value', snapshot => {
            dispatch({ type: SHOPPING_FOOD_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
}

export const shoppingFoodSave = ({ name, uid }) =>{
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/shoppingFoods/${uid}`)
        .set({ name })
        .then(() => {
            dispatch({ type: SHOPPING_FOOD_SAVE_SUCCESS });
            // need an action to reset the blank
        })
    }
}

export const shoppingFoodDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/shoppingFoods/${uid}`)
        .remove();
    };
};