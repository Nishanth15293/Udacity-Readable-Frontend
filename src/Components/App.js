import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Route } from 'react-router-dom';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Route exact path='/' 
          render={(history)=> (
            <Dashboard />
          )}
        />
        {/* <Route exact path='/categories/:category' 
          component={CategoryPage}
        /> */}
        <Route exact path='/categories/:category' 
          render={({match})=>(
            <CategoryPage match={match}/>
          )}
        />
        {/* <Route exath path='/posts/:post_id' 
          render={({match})=> (
            <PostDetail match={match}/>
          )}
        /> */}
        <Route exact path='/posts/:post_id' component= {PostDetail}/>
        
        <Route exact path='/newPost' component= {CreatePost}/>
        <Route exact path='/editPost/:id' component= {EditPost}/>
        <Route exact path='/posts/:id/comment' component= {CreateComment}/>
        <Route exact path='/posts/:id/:comment_id/edit' component= {EditComment}/>

      </div>
    );
  }
}

// function mapStateToProps (categories) {
//   return {
//     cats: Object.keys(categories).map((cat) => ({

//     })) 
//   }
// }

export default withRouter(connect()(App));
