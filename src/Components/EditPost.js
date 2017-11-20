import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getCategories} from '../Actions/category'
import {editPost} from '../Actions/post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as helpers from '../Utils/helpers';
import Loading from './Loading'

class EditPost extends Component{
    state={
    }

    componentWillMount() {
        this.props.getCategories();
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const postData = {};
        postData.title = e.target.title.value;
        postData.body = e.target.body.value;
        
        if(postData.title !== '' && postData.body !== '' ) {
            this.props.editPost(this.props.post.id, postData, () => {
                this.props.history.push('/');
                // this.props.history.goBack();
                // this.props.history.push(`/posts/${this.props.post.id}`);
            })
        }else{
            alert(`Title and body cannot be empty!`)
        }
    }

    render() {
        const { categories, post } = this.props;
        return(
            (!post) ? <Loading /> :
            <div className="container">
                <div className='row post-form'>
                    <form className='col-offset-md-2 col-md-8' onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='postTitle'>Title</label>
                            <input type='text'  defaultValue={post.title} id='title' className='form-control' placeholder='Title' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='body'>Body</label>
                            <textarea type='text' defaultValue={post.body} id='body' className='form-control' placeholder='Content' />
                        </div>
                        <div className='row'>
                            <button type='submit' className='btn btn-md btn-primary margin-btn'>Update</button>
                            <Link to={`/posts/${post.id}`}>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({posts, categories}, {match}) {
    debugger;
    const allPosts = helpers.arrayFromObject(posts);
    if(Array.isArray(allPosts))
        return {
            categories: helpers.arrayFromObject(categories),
            post: allPosts.filter((post)=>{
                return post.id === match.params.id;
            })[0]
        }
    return {}
}


export default withRouter(connect(mapStateToProps, {getCategories, editPost})(EditPost))