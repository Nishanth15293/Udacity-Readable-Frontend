import React, { Component } from 'react';
import Comment  from './Comment';
import {getComments} from '../Actions/comment'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as helpers from '../Utils/helpers'

class CommentList extends Component{
    state={}

    componentDidMount(){
        this.props.getComments(this.props.postId)
    }

    render() {
        const { comments } = this.props;
        return(
            <div className="container">
                <div className="row">
                {Array.isArray(comments) && comments.map((comment)=>(
                    <Comment key={comment.id} comment={comment} />
                ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps({comments}){
    return {
        comments: helpers.arrayFromObject(comments)
    }
}

// export default CommentList
export default withRouter(connect(mapStateToProps, {getComments})(CommentList))
