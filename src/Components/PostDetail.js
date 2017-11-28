import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as helpers from '../Utils/helpers'
import Moment from 'react-moment';
import {getComments} from '../Actions/comment'
import {votePost, getPosts, deletePost} from '../Actions/post'
import CommentList from './CommentList'
import FaPencilSquate from 'react-icons/lib/fa/pencil-square'
import { Link }  from 'react-router-dom'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaTrash from 'react-icons/lib/fa/trash'
import Loading from './Loading'
class PostDetail extends Component{
    state={}

    componentWillMount(){
        this.props.getPosts();
        // this.props.getComments(this.props.post.id);
    }

    onPostDelete = (id) => {
        this.props.deletePost(id, ()=>{
            this.props.history.push('/')
        })
    }

    render() {
        const { post, comments, match, getPosts, votePost } = this.props;
        return(
            (!post)?<Loading />:
            <div className="container">
            {post && 
                <div className="col-md-12"> 
                    <div className="row">
                        <div className="col-md-9">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="col-md-3">
                            <Link to={`/editPost/${post.id}`}><FaPencilSquate />Edit</Link>
                            <FaTrash onClick={()=>{
                                this.onPostDelete(post.id)
                                }}/>
                        </div>
                    </div>
                    <h6>{post.author}</h6>
                    
                    <p>{post.body}</p>
                    <span className="badge">Posted <Moment>{post.timestamp}</Moment></span> 
                    <div className="row">
                        <div className="col-md-12">
                            <span>{post.voteScore}</span>
                            <span ><FaThumbsUp onClick={() => { 
                                votePost(post.id, "upVote")
                                getPosts()}}/> </span>
                            <span ><FaThumbsDown onClick={() => {
                                votePost(post.id, 'downVote') 
                                getPosts()}}/> </span>
                            <span className="comment-circle">{comments.length} comments</span>
                        </div>
                    </div>
                    <CommentList postId={post.id} />
                    {<Link className="btn btn-primary" to={`/posts/${post.id}/comment`}> Add Comment</Link>}
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps({posts, comments}, {match}){
    return {
        post: posts[match.params.post_id],
        comments: helpers.arrayFromObject(comments).filter((comment)=>{
            return comment.parentId === match.params.post_id;
        })
    }
}

function mapDispatchToProps(dispatch) {
    return{
        votePost: (id, option) => dispatch(votePost(id, option)),
        getPosts: () => dispatch(getPosts()),
        getComments: (postId) => dispatch(getComments(postId)),
        deletePost: (postId, callback) => dispatch(deletePost(postId, callback))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))