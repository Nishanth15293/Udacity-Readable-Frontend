import * as fetchUtil from '../Utils/fetchUtil';
import * as helpers from '../Utils/helpers'
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';

export const receivePosts = posts =>({
    type: RECEIVE_POSTS,
    posts
});


export const getPosts = () => dispatch => (
    fetchUtil.getPosts()
        .then((posts) =>{
            dispatch(receivePosts(helpers.objectFromArray(posts)))  
        })
);

export function createPost(postData, callback) {
    const { title, body, author, category } = postData;
    const data = {
        id: helpers.guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }
    return  dispatch => (
        fetchUtil.createNewPost(data)
        .then(res => {
            callback()
            dispatch(createPostSuccess(res))
        })
    )
}

function createPostSuccess(data) {
    return {
        type: CREATE_POST,
        payload: data
    }
}

export function editPost(postId, postData, callback) {
    return dispactch => (
        fetchUtil.updatePost(postId, postData)
        .then(res => {
            callback()
            // dispatch(editPostSuccess(res))
        })
    )
}

function editPostSuccess(data) {
    return {
        type: EDIT_POST,
        payload: data
    }
}

export function votePost(postId, vote, callback) {
    return dispatch => (
        fetchUtil.votePost(postId, {option: vote})
        .then(res=>{
            dispatch(votePostSuccess(res))
        })
    )
}

function votePostSuccess(data) {
    return {
        type: VOTE_POST,
        payload: data
    }
}

export function deletePost(postId, callback){
    return dispatch => (
        fetchUtil.deletePost(postId)
            .then(res=>{
                callback()
                dispatch(deletePostSuccess(res))
            })
    )
}

function deletePostSuccess(post){
    return {
        type: DELETE_POST,
        postId: post.id
    }
}