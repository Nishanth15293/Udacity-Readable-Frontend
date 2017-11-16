import * as fetchUtil from '../Utils/fetchUtil'
import * as helpers from '../Utils/helpers'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

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

export const createComment = (comment, callback) => dispatch =>(
    fetchUtil.addComment(comment)
        .then((res) =>{
            callback();
            dispatch(createCommentSuccess(res))
        })
)

function createCommentSuccess(data){
    return {
        type: CREATE_COMMENT,
        comment: data
    }
}

export const updateComment = (commentId, commentData, callback) => dispatch =>(
    fetchUtil.updateComment(commentId, commentData)
        .then((res)=>{
            callback();
            dispatch(updateCommentSuccess(res))
        })
)

function updateCommentSuccess(data) {
    return {
        type: UPDATE_COMMENT,
        comment: data
    }
}

export const deleteComment = (commentId, callback) => dispatch => (
    fetchUtil.deleteComment(commentId)
        .then((res) =>{
            callback();
            dispatch(deleteCommentSuccess(res))
        })
)

function deleteCommentSuccess(data) {
    return {
        type: DELETE_COMMENT,
        payload: data
    }
}

export function voteComment(commentId, vote, cb) {
    return dispatch => (
        fetchUtil.voteComment(commentId, {option: vote})
        .then(res=>{
            cb()
            dispatch(voteCommentSuccess(res))
        })
    )
}

function voteCommentSuccess(data) {
    return {
        type: VOTE_COMMENT,
        payload: data
    }
}