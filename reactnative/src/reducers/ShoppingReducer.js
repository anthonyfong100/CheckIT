import {
    SHOPPING_FOOD_FETCH_SUCCESS
} from '../actions/types';

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SHOPPING_FOOD_FETCH_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}