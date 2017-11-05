import { RECEIVE_CATEGORIES } from '../Actions/category';

const initialState = {
    // categories: []
};

export default function categories( state = initialState, action){
    switch(action.type){
        case RECEIVE_CATEGORIES: {
            const { categories } = action;
            return  categories
        }

        default: {
            return state;
        }
    }
}