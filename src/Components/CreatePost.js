import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getCategories} from '../Actions/category'
import {createPost} from '../Actions/post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as helpers from '../Utils/helpers';

class CreatePost extends Component{
    state={
        title: '',
        body: '',
        author: '',
        category: 'react'
    }

    componentWillMount() {
        this.props.getCategories();
    }

    valueChange(field, value){
        switch (field) {
            case 'title': this.setState({title: value})
                          break;
            case 'body': this.setState({body: value})
                          break;
            case 'author': this.setState({author: value})
                          break;
            case 'category': this.setState({category: value})
                          break;
            default: break;
        }
    }

    onSubmit(){
        if(this.state.title !== '' && this.state.body !== '' && this.state.author !== '') {
            this.props.createPost(this.state, () => {
                this.props.history.push('/');
            })
        }
    }

    render() {
        const { categories } = this.props;
        return(
            <div className='row post-form'>
                <form className='col-offset-md-2 col-md-8'>
                    <div className='form-group'>
                        <label htmlFor='postTitle'>Title</label>
                        <input type='text' value={this.state.title} onChange={(e) => this.valueChange('title', e.target.value)} id='postTitle' className='form-control' placeholder='Title' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='body'>Body</label>
                        <textarea type='text' id='body' value={this.state.body} onChange={(e) => this.valueChange('body', e.target.value)} className='form-control' placeholder='Content' />
                    </div>
                    <div className='row'>
                        <div className='form-group col-md-6'>
                            <label htmlFor='author'>Author</label>
                            <input type='text' id='author' value={this.state.author} onChange={(e) => this.valueChange('author', e.target.value)} className='form-control' placeholder='Author' />
                        </div>
                        <div className='form-group col-md-6 category-selection-margin'>
                            <label htmlFor='category'>Category</label>
                            <select className='category-selection' onChange={(e) => this.valueChange('category', e.target.value)}>
                                {categories.length > 0 && categories.map((category) => (
                                    <option value={category.name} key={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>   
                    </div>
                    <div className='row'>
                        <span className='btn btn-md btn-primary margin-btn' onClick={() => this.onSubmit()}>Submit</span>
                        <Link to='/'>
                            <span className='btn btn-md btn-default margin-btn'>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: helpers.arrayFromObject(state.categories)
    }
}


export default withRouter(connect(mapStateToProps, {getCategories, createPost})(CreatePost))