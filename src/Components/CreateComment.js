import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getCategories} from '../Actions/category'
import {createComment} from '../Actions/comment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as helpers from '../Utils/helpers';

class CreateComment extends Component{
    addComment = (e) => {
        e.preventDefault()
        const comment = {}
        comment.parentId = this.props.match.params.id
        comment.author = e.target.author.value
        comment.body = e.target.body.value
        comment.id = helpers.guid()
        comment.timestamp = Date.now()
    
        if (comment.body === '' || comment.author === '') {
          alert("Author and body cannot be empty")
        } else {
          this.props.createComment(comment,() => this.props.history.push(`/posts/${comment.parentId}`))
        }
    }

    render() {
        const { categories } = this.props;
        return(
            <div className='row post-form'>
                <form className='col-offset-md-2 col-md-8' onSubmit={this.addComment.bind(this)}>
                    <div className='form-group'>
                        <label htmlFor='author'>Author</label>
                        <input type='text'  id='author' className='form-control' placeholder='Author' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='body'>Comment</label>
                        <textarea type='text' id='body' className='form-control' placeholder='Comment' />
                    </div>
                    <div className='row'>
                        <button type='submit' className='btn btn-primary '>Submit</button>
                        <Link to={`/posts/${this.props.match.params.id}`}>
                            <span className='btn btn-default '>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        comments: helpers.arrayFromObject(state.comments)
    }
}


export default withRouter(connect(mapStateToProps, {createComment})(CreateComment))