import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import eventService from 'src/views/services/event';
import Swal from 'sweetalert2';

const ListEvent = () => {
    const [events, setEvents] = useState([])
  const getEvents = async () => {
    const response = await eventService.getAllEvents();
    setEvents(response.data)
  }
  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-2'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await eventService.removeOne(id)
        getEvents()
        toast.success(response.data.message)
      } 
    })
  }

  useEffect(() => {
    getEvents()
  }, [])
    return (
        <div className="card">
            <div className="card-header">
                <h3>List of events</h3>
            </div>
            <div className="card-body">
                <Link className='btn btn-secondary my-4' to='/event/create'>Create Event</Link>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr style={{backgroundColor :'#46546C', color: 'white'}}>
                            <th className='col-1'>#</th>
                            <th className='col-2'>Title</th>
                            <th className='col-3'>Date & time</th>
                            <th className='col-2'>Available tickets</th>
                            <th className='col-1'>Price</th>
                            <th className='col-1'>Photo</th>
                            <th className='col-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
              events.map((event, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.eventName}</td>
                    <td>{event.eventDate} at {event.eventTime}</td>
                    <td>{event.availableTicketNumber}</td>
                    <td>{event.price === 0 ? ( <label className='badge text-bg-success'>Free</label>) : <label className='badge text-bg-info'>{event.price}$</label>}</td>
                    <td><img src={event.photo} width='50px' height='50px' alt='' /></td>
                    <td>
                      <Link className='btn btn-info mx-1' to={'/event/update/' + event._id}><CIcon icon={cilPen} size="lg" style={{ color: 'white' }} /></Link>
                      <button className='btn btn-danger ms-1' onClick={() => handleDelete(event._id)} ><CIcon icon={cilTrash} size="lg" style={{ color: 'white' }} /></button>
                    </td>
                  </tr>
                )
              })
            }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default ListEvent;