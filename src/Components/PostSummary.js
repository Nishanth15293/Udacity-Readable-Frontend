import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostSummary extends Component{
    state={}

    componentDidMount(){

    }

    render() {
        const { post } = this.props;
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1><Link to={`/posts/${post.id}`}>{post.title}</Link></h1>
                    <h6>{post.author}</h6>
                    
                    <p>{post.body}</p>
                </div>
                <span className="badge">Posted {post.timestamp}</span><div className="pull-right">Tags</div>         
            </div>
        );
    }
}



export default PostSummary