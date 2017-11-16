import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getCategories} from '../Actions/category'
import {updateComment, getComments} from '../Actions/comment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as helpers from '../Utils/helpers';
import Loading from './Loading'

class EditComment extends Component{

    componentWillMount(){
        this.props.getComments(this.props.match.params.id);
    }

    updateComment = (e) => {
        e.preventDefault()
        const comment = {}
        const parentId = this.props.match.params.id
        // comment.author = e.target.author.value
        comment.body = e.target.body.value
        comment.timestamp = Date.now()
        const commentId = this.props.comment.id
    
        if (comment.body === '' ) {
          alert("Cant post an empty comment!")
        } else {
          this.props.updateComment(commentId, comment, () => this.props.history.push(`/posts/${parentId}`))
        }
    }

    render() {
        const { comment } = this.props;
        
        return(
            (!comment) ? <Loading /> :
            <div className='row post-form'>
                <form className='col-offset-md-2 col-md-8' onSubmit={this.updateComment.bind(this)}>
                    <div className='form-group'>
                        <label htmlFor='author'>Author</label>
                        <input type='text'  defaultValue={comment.author} id='author' className='form-control' placeholder='Author' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='body'>Comment</label>
                        <textarea type='text' defaultValue={comment.body} id='body' className='form-control' placeholder='Comment' />
                    </div>
                    <div className='row'>
                        <button type='submit' className='btn btn-primary '>Update</button>
                        <Link to={`/posts/${this.props.match.params.id}`}>
                            <span className='btn btn-default '>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, {match}) {
    return {
        comment: helpers.arrayFromObject(state.comments).filter((comment)=>{
            return comment.id === match.params.comment_id
        })[0]
    }
}


export default withRouter(connect(mapStateToProps, {updateComment, getComments})(EditComment))