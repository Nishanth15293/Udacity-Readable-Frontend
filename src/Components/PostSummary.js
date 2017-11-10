import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class PostSummary extends Component{
    state={}

    componentDidMount(){

    }

    render() {
        const { post } = this.props;
        const author = post.author.charAt(0).toUpperCase() + post.author.slice(1, post.author.length);
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1><Link to={`/posts/${post.id}`}>{post.title}</Link></h1>
                    <strong>{author}</strong>
                    
                    <p>{post.body}</p>
                </div>
                <span className="badge">Posted <Moment>{post.timestamp}</Moment></span><div className="pull-right">Tags</div>         
            </div>
        );
    }
}



export default PostSummary