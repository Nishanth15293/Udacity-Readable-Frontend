import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import CategoryPage from './CategoryPage';
import { connect } from 'react-redux';
import { getCategories } from '../Actions/category';
import { getPosts } from '../Actions/post';
import { withRouter } from 'react-router-dom'
import PostDetail from './PostDetail'
import CreatePost from './CreatePost'
import CreateComment from './CreateComment'
import EditComment from './EditComment'
import EditPost from './EditPost'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCategories());
    dispatch(getPosts());
  }


  render() {
    return (
      <div className="App">
        <div className="app-bar row">
          <div className="col-md-1">
            <Link className="left" to={"/"}><button>Dashboard</button></Link>
          </div>
          <div className="col-md-10">
            <h1 className="app-header">Readable App</h1>
          </div>
          <div className="col-md-1"></div>
        </div>
        <Route exact path='/' 
          render={(history)=> (
            <Dashboard />
          )}
        />
       
        <Route exact path='/categories/:category' 
          render={({match})=>(
            <CategoryPage match={match}/>
          )}
        />
    
        <Route exact path='/:category/:post_id' component= {PostDetail}/>
        <Route exact path='/newPost' component= {CreatePost}/>
        <Route exact path='/editPost/:id' component= {EditPost}/>
        <Route exact path='/posts/:id/comment' component= {CreateComment}/>
        <Route exact path='/posts/:id/:comment_id/edit' component= {EditComment}/>

      </div>
    );
  }
}

export default withRouter(connect()(App));
