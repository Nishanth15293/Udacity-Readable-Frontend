import React, { Component } from 'react'
import PostSummary from './PostSummary'
import { connect } from 'react-redux'
import * as helpers from '../Utils/helpers'
import { withRouter } from 'react-router-dom'

class CategoryPage extends Component {
    state = {
        posts : [],
    }

    componentDidMount() {
    }

    render() {
        const { posts, match } = this.props;
        const catName = match.params.category;
        const categoryPosts = posts.filter((post)=>(post.category === catName));
        const categoryHeading = catName.charAt(0).toUpperCase() + catName.slice(1, catName.length) + ' Posts'; 
        return (
            <div className="container">
                <h1 className="category-header">{categoryHeading}</h1>
                {Array.isArray(categoryPosts) && categoryPosts.map((post)=>(
                    
                    <PostSummary key={post.id} post={post} />
                ))
                
                }
            </div>
        )
    }
}

function mapStateToProps({ posts}){
    return {
        posts: helpers.arrayFromObject(posts)
    }
}

export default withRouter(connect(mapStateToProps)(CategoryPage))