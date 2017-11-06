import { RECEIVE_COMMENTS } from '../Actions/comment';

const initialState = {
    
};

export default function comments( state = initialState, action){

    switch(action.type){
        case RECEIVE_COMMENTS: {
            const { comments } = action;
            return comments
        }

        default: {
            return state;
        }
    }
}