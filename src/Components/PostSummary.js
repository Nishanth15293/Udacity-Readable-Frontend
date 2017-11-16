import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import {votePost, getPosts} from '../Actions/post'
import {withRouter} from 'react-router-dom'
import * as helpers from '../Utils/helpers';
import {connect} from 'react-redux'


class PostSummary extends Component{
    state={}

    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        const { post, getPosts, votePost } = this.props;
        const author = post.author.charAt(0).toUpperCase() + post.author.slice(1, post.author.length);
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1><Link to={`/posts/${post.id}`}>{post.title}</Link></h1>
                    <strong>{author}</strong>
                    
                    <p>{post.body}</p>
                </div>
                <span className="badge">Posted <Moment>{post.timestamp}</Moment></span>     
                <div className="row">
                    <div className="col-md-12">
                        <span>{post.voteScore}</span>
                        <span ><FaThumbsUp onClick={() => {debugger; 
                            votePost(post.id, "upVote")
                            getPosts()}}/> </span>
                        <span ><FaThumbsDown onClick={() => {debugger;
                            votePost(post.id, 'downVote') 
                            getPosts()}}/> </span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({}, { post }) {
    return {
      post
    }
  }

function mapDispatchToProps(dispatch) {
    return{
        votePost: (id, option) => dispatch(votePost(id, option)),
        getPosts: () => dispatch(getPosts())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostSummary))