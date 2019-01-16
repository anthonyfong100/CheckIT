import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Actions } from 'react-native-router-flux';
import {
    SHOPPING_FOOD_CREATE,
    SHOPPING_FOOD_FETCH_SUCCESS
} from './types';

export const shoppingFoodCreate = ({ name }) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/shoppingFood`)
        .push({ name })
        .then(() => {
            dispatch({ type: SHOPPING_FOOD_CREATE })
            Actions.pop({ type: 'reset' });
        });
    };
};

export const shoppingFoodFetch = () => {
    const { currentUser } =firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/user/${currentUser.uid}/shoppingFood/`)
        .on('value', snapshot => {
            dispatch({ type: SHOPPING_FOOD_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
}