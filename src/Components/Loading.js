import React from 'react'
import Back from 'react-icons/lib/ti/arrow-left-thick'
import {Link} from 'react-router-dom'

const Loading = () => (
    <div>
        <div className='container-fluid'>
            <div className='row title'>
                <div className='col-md-1'>
                    <Link to='/'><Back size={30} className='back-icon'/></Link>
                </div>
                <div className='col-md-11'>
                    Readable
                </div>
            </div>
        </div>
        <div className='row text-center'>
            <h3>
                 Loading...
            </h3>
        </div>
    </div>
);

export default Loading;