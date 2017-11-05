import React, { Component } from 'react'
import * as fetchAPI from '../Utils/fetchUtil'
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
        const categoryPosts = posts.filter((post)=>(post.category === match.params.category));
        return (
            <div>
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