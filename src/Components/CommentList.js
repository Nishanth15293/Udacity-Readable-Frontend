import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment  from './Comment';

class CommentList extends Component{
    state={}

    componentDidMount(){

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



export default CommentList