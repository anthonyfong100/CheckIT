import {
    FRIDGE_FOOD_UPDATE,
    FRIDGE_FOOD_CREATE,
    FRIDGE_FOOD_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    expiry: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FRIDGE_FOOD_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };

        case FRIDGE_FOOD_CREATE:
            return INITIAL_STATE;

        case FRIDGE_FOOD_SAVE_SUCCESS:
            return INITIAL_STATE;
            
        default:
            return state;
    }
};