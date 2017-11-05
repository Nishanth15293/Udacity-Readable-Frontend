import categories from './category'
import posts from './post'
import { combineReducers}  from 'redux'


export default combineReducers({
    categories,
    posts
})
