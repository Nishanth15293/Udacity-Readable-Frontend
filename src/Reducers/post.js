import { RECEIVE_POSTS, VOTE_POST, DELETE_POST } from '../Actions/post';
import * as helpers from '../Utils/helpers';


export default function posts( state = {}, action){

    switch(action.type){
        case RECEIVE_POSTS: {
            const { posts } = action;
            return posts
        }

        case VOTE_POST:
            return Object.keys(state).map(id => {
                var post;
                if(id === action.postId) {
                post = action.payload
                }
                return post
            })

        case DELETE_POST:{
            return helpers.arrayFromObject(state).filter(post => post.id !== action.postId)
        }

        default: {
            return state;
        }
    }
}