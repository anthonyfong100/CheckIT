import {
    CAMERA_FOOD_CREATE,
    CAMERA_FOOD_SAVE_SUCCESS,
    CAMERA_FOOD_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    expiry: ''
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CAMERA_FOOD_CREATE:
            return INITIAL_STATE;
        case CAMERA_FOOD_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CAMERA_FOOD_SAVE_SUCCESS:
            return INITIAL_STATE
        default:
            return state;
    }
}