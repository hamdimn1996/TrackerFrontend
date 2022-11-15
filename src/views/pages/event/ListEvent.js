import React from 'react';
import { Link } from 'react-router-dom';

const ListEvent = () => {
    return (
        <div className="card">
            <div className="card-header">
                <h3>List of events</h3>
            </div>
            <div className="card-body">
                <Link className='btn btn-secondary my-4' to='/event/create'>Create Event</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className='col-1'>#</th>
                            <th className='col-2'>Title</th>
                            <th className='col-3'>Date & time</th>
                            <th className='col-2'>Price</th>
                            <th className='col-2'>Photo</th>
                            <th className='col-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* List here */}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default ListEvent;