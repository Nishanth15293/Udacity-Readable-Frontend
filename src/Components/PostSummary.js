import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import {votePost, getPosts} from '../Actions/post'
import {withRouter} from 'react-router-dom'
import * as helpers from '../Utils/helpers';
import {connect} from 'react-redux'
import {getComments} from '../Actions/comment'


class PostSummary extends Component{

    // componentWillMount(){
    //     this.props.getPosts();
    // }

    componentDidMount(){
        this.props.getComments(this.props.post.id);
    }

    render() {
        const { post, getPosts, votePost, comments } = this.props;
        const author = post.author.charAt(0).toUpperCase() + post.author.slice(1, post.author.length);
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h1>
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
                        <span className="comment-circle">{comments.length} comments</span>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({comments}, { post }) {
    let cmnts = helpers.arrayFromObject(comments).filter((comment)=>{
        return comment.parentId === post.id;
    })
    return {
      post,
      comments: cmnts
    }
  }

function mapDispatchToProps(dispatch) {
    return{
        votePost: (id, option) => dispatch(votePost(id, option)),
        // getPosts: () => dispatch(getPosts()),
        getComments: (postId) => dispatch(getComments(postId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary))