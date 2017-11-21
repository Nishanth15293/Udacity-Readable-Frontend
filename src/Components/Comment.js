import React, { Component } from 'react';
import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from 'react-icons/lib/fa/edit'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import {deleteComment, getComments, voteComment} from '../Actions/comment'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class Comment extends Component{

    onCommentDelete = (comment) =>{
        let parentId = comment.parentId
        this.props.deleteComment(comment.id, ()=>{
            this.props.history.push(`/posts/${parentId}`)
            this.props.getComments(parentId)
        })
    }

    render() {
        const { comment, voteComment, history} = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-11">
                        <h3>{comment.author}</h3>
                        <p>{comment.body}</p>
                    </div>
                    <div className="col-md-1">
                        {<Link to={`/posts/${comment.parentId}/${comment.id}/edit`}><FaEdit /></Link>}
                        <span onClick={()=>{this.onCommentDelete(comment)}}><FaTrash /></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>{comment.voteScore}</span>
                        <span ><FaThumbsUp onClick={() => { 
                            voteComment(comment.id, "upVote", ()=>{history.push(`/posts/${comment.parentId}`)})
                        }}/> </span>
                        <span ><FaThumbsDown onClick={() => {
                            voteComment(comment.id, 'downVote', ()=>{history.push(`/posts/${comment.parentId}`)}) 
                        }}/> </span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        deleteComment: (commentId, callback) => dispatch(deleteComment(commentId, callback)),
        getComments: (postId) => dispatch(getComments(postId)),
        voteComment: (commentId, option, cb) =>dispatch(voteComment(commentId, option, cb))
    }
}


export default withRouter(connect(null, mapDispatchToProps)(Comment))