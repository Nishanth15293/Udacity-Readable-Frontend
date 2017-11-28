import { RECEIVE_COMMENTS, DELETE_COMMENT, CREATE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../Actions/comment';

const initialState = {
    
};

export default function comments( state = initialState, action){

    switch(action.type){
        case RECEIVE_COMMENTS: {
            const { comments } = action
            // return {
            //     ...state, 
            //     comments
            // }
            return Object.assign({}, state, comments)
        }

        case CREATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }

        case UPDATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }

        case DELETE_COMMENT:
            return {
                ...state,
                [action.comment.id]:action.comment
            }

        case VOTE_COMMENT:
            return {
                ...state,
                [action.comment.id]:action.comment
            }

        default: {
            return state
        }
    }
}