import * as fetchUtil from '../Utils/fetchUtil';
import * as helpers from '../Utils/helpers'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories =>({
    type: RECEIVE_CATEGORIES,
    categories
});


export const getCategories = () => dispatch => (
    fetchUtil.getCategories()
        .then(res => dispatch(receiveCategories(helpers.objectFromArray(res.categories, 'name'))))
);