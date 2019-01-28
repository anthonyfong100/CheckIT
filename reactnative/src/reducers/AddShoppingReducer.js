import {
    SHOPPING_FOOD_UPDATE,
    SHOPPING_FOOD_CREATE,
    SHOPPING_FOOD_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOPPING_FOOD_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };

        case SHOPPING_FOOD_CREATE:
            return INITIAL_STATE;

        case SHOPPING_FOOD_SAVE_SUCCESS:
            return INITIAL_STATE;
            
        default:
            return state;
    }
};