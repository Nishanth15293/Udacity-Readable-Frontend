import categories from './category'
import posts from './post'
import comments from './comment'
import { combineReducers}  from 'redux'


export default combineReducers({
    categories,
    posts,
    comments
})
