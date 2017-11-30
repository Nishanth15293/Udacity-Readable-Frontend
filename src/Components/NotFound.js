import React from 'react';
import {Link} from 'react-router-dom'

const NotFound = () =>
  <div>
    <div className='row'>
      <div className='col-md-3'></div>
      <div className=' col-md-9'>
        <h3><b>404 page not found</b></h3>
        <em>Sorry the page you are looking for, does not exist.</em>
      </div>
    </div>
  </div>

export default NotFound;