import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as helpers from '../Utils/helpers';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import {getPosts} from '../Actions/post'
import {getCategories} from '../Actions/category'

class Dashboard extends Component {
    state = {
        filter: 'voteScore'
    }

    componentWillMount() {
        this.props.getPosts();
        this.props.getCategories();
    }

    sortBy(posts, filter) {
        if(filter === 'voteScore'){
            return posts.sort((a,b)=>{
                return b.voteScore - a.voteScore;
            });
        }else if(filter === 'timestamp'){
            return posts.sort((a,b)=>{
                return new Date(a.timestamp) < new Date(b.timestamp)
            })
        }
    }

    onSortChange(val) {
        this.setState({filter: val});
    }

    render() {
        const { categories, posts } = this.props;
        const { filter } = this.state;
        const sortedPosts = this.sortBy(posts, filter); 
        return (
            <div>
                <h1>DashBoard Page</h1>
                <div className="row">
                <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <select className="sort-dropdown" onChange={(e)=>{ this.onSortChange(e.target.value);}}>
                            <option value="voteScore">Vote Score</option>
                            <option value="timestamp">Time Posted</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <Link className="btn btn-primary"to="/newPost" >Add Post</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            {Array.isArray(categories) && categories.length > 0 && categories.map((category) =>(
                                <li key={category.name} className="list-group-item"> <Link  to={`/categories/${category.name}`}>{category.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {Array.isArray(sortedPosts) && posts.map((post)=>(
                            post && <PostSummary key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({categories, posts}){
    return {
        categories: helpers.arrayFromObject(categories),
        posts: helpers.arrayFromObject(posts)
    }
}

export default withRouter(connect(mapStateToProps, {getPosts, getCategories})(Dashboard))