import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TagService from 'src/views/services/tag';
import Swal from 'sweetalert2';

function ListTag() {
    const [tags, setTags] = useState([])
  const getTags = async () => {
    const response = await TagService.getAllTags();
    setTags(response.data)
  }
  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-secondary me-5'
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
        const response = await TagService.removeOne(id)
        getTags()
        toast.success(response.data.message)
      } 
    })
  }

  useEffect(() => {
    getTags()
  }, [])
    return (
        <div className="card">
            <div className="card-header">
                <h3>List of tags</h3>
            </div>
            <div className="card-body">
                <Link className='btn btn-secondary my-4' to='/tag/create'>Create tag</Link>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr style={{backgroundColor :'#46546C', color: 'white'}}>
                            <th className='col-1 text-center'>#</th>
                            <th className='col-9'>Title</th>
                            <th className='col-2 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
              tags.map((tag, index) => {
                return (
                  <tr key={index}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{tag.title}</td>
                    <td className='text-center'>
                      <Link className='btn btn-info mx-1' to={'/tag/update/' + tag._id}><CIcon icon={cilPen} size="lg" style={{ color: 'white' }} /></Link>
                      <button className='btn btn-danger ms-1' onClick={() => handleDelete(tag._id)} ><CIcon icon={cilTrash} size="lg" style={{ color: 'white' }} /></button>
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

export default ListTag