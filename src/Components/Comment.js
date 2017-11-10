import React, { Component } from 'react';

class Comment extends Component{
    state={}

    componentDidMount(){

    }

    render() {
        const { comment } = this.props;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>{comment.author}</h3>
                        <p>{comment.body}</p>
                    </div>
                </div>
            </div>
        );
    }
}



export default Comment