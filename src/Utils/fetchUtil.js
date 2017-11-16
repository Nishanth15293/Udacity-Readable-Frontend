import axios from 'axios';

const api = 'http://localhost:3001'

let token = localStorage.token || 'faketoken'

// axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = token;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => {
    return axios.get(`${api}/categories`, { headers })
        .then(res => res.data);
}

/**
 * 
 * Blog Post routes
 */

export const getCategoryPosts = (category) => {
    return axios.get(`${api}/${category}/posts`, { headers })
        .then(res => res.data);
}

export const getPosts = () => {
    return axios.get(`${api}/posts`, { headers })
        .then(res => res.data);
}

export const createNewPost = (postData) => {
    return axios.post(`${api}/posts`, postData, { headers })
        .then(res => res.data);
}

export const getPostDetail = (postId) => {
    return axios.get(`${api}/posts/${postId}`, { headers })
        .then(res => res.data);
}

//option: "upVote" or "downVote"
export const votePost = (postId, postData) => {
    return axios.post(`${api}/posts/${postId}`, postData, { headers })
        .then(res => res.data);
}

export const updatePost = (postId, postData) => {
    return axios.put(`${api}/posts/${postId}`, postData, { headers })
        .then(res => res.data);
}

export const deletePost = (postId) => {
    return axios.delete(`${api}/posts/${postId}`, { headers })
        .then(res => res.data);
}

/**
 * 
 * Comments routes
 */
export const getPostComments = (postId) => {
    return axios.get(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.data);
}


export const addComment = (commentData) => {
    return axios.post(`${api}/comments`, commentData, { headers })
        .then(res => res.data);
}


export const getCommentDetail = (commentId) => {
    return axios.get(`${api}/comments/${commentId}`, { headers })
        .then(res => res.data);
}

//option: "upVote" or "downVote"
export const voteComment = (commentId, commentData) => {
    return axios.post(`${api}/comments/${commentId}`, commentData, { headers })
        .then(res => res.data);
}

export const updateComment = (commentId, commentData) => {
    return axios.put(`${api}/comments/${commentId}`, commentData, { headers })
        .then(res => res.data);
}

export const deleteComment = (commentId) => {
    return axios.delete(`${api}/comments/${commentId}`, { headers })
        .then(res => res.data);
}

