import * as fetchUtil from '../Utils/fetchUtil';
import * as helpers from '../Utils/helpers'
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';

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