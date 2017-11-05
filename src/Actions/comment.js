import * as fetchUtil from '../Utils/fetchUtil';
import * as helpers from '../Utils/helpers'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const receiveComments = comments =>({
    type: RECEIVE_COMMENTS,
    comments
});



export const getComments = (postId) => dispatch => (
    fetchUtil.getPostComments(postId)
        .then((comments) =>{
            dispatch(receiveComments(helpers.objectFromArray(comments)))  
        })
);