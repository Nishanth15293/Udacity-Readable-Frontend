import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as helpers from '../Utils/helpers';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
    state = {
        categories : []
    }

    componentDidMount() {

    }

    render() {
        const { categories, posts } = this.props;
        console.log(categories);
        return (
            <div>
                <h1>DashBoard Page</h1>
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            {Array.isArray(categories) && categories.map((category) =>(
                               <li className="list-group-item"> <Link key={category.name} to={`/categories/${category.name}`}>{category.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {Array.isArray(posts) && posts.map((post)=>(
                            <PostSummary key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({categories, posts}){
    return {
        categories: helpers.arrayFromObject(categories),
        posts: helpers.arrayFromObject(posts)
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))