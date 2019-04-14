import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import {
    CAMERA_FOOD_CREATE,
    CAMERA_FOOD_SAVE_SUCCESS,
    CAMERA_FOOD_UPDATE
} from './types';

// is this needed?
export const cameraFoodCreate = ({ name, expiry }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFoods`)
            .push({ name, expiry })
            .then(() => {
                dispatch({ type: CAMERA_FOOD_CREATE })
            })
    }
}

export const cameraFoodUpdate = ({ prop, value }) => {
    return {
        type: CAMERA_FOOD_UPDATE,
        payload: { prop, value }
    }
}

export const cameraFoodSave = ({ name, expiry, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/fridgeFoods/${uid}`)
            .set({ name, expiry })
            .then(() => {
                dispatch({ type: CAMERA_FOOD_SAVE_SUCCESS });
            })
    }
}