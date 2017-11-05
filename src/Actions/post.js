import * as fetchUtil from '../Utils/fetchUtil';
import * as helpers from '../Utils/helpers'
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

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