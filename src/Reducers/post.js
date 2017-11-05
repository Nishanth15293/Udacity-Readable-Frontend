import { RECEIVE_POSTS } from '../Actions/post';

const initialState = {
    
};

export default function posts( state = initialState, action){

    switch(action.type){
        case RECEIVE_POSTS: {
            const { posts } = action;
            return posts
        }

        default: {
            return state;
        }
    }
}