import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as fetchAPI from '../Utils/fetchUtil'
import * as helpers from '../Utils/helpers'
import {getComments} from '../Actions/comment'
class PostDetail extends Component{
    state={}

    componentDidMount(){
        const {posts, match, receiveCmnts,dispatch} = this.props;
        const post = posts?posts[match.params.post_id]:{}
        if(post && post.id){
            dispatch(getComments(post.id));
        }

    }

    render() {
        const { posts, match } = this.props;
        if(posts){
            var post = posts[match.params.post_id];
        }else{
           var post = {};
        }
        return(
            <div className="container">
            {post && 
                <div className="col-md-12">
                    <h1>{post.title}</h1>
                    <h6>{post.author}</h6>
                    
                    <p>{post.body}</p>
                    <span className="badge">Posted {post.timestamp}</span><div className="pull-right">Tags</div>         
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps({posts, comments}, {match}){
    return {
        posts,
        comments
    }
}

// function mapDispatchToProps(dispatch) {
//     return{
//         receiveCmnts: (comments) => dispatch(receiveComments(comments))
//     }
// }

export default withRouter(connect(mapStateToProps)(PostDetail))