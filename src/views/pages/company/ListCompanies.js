import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import companyService from '../../services/company'

function ListCompanies() {
  const [campanies, setCompanies] = useState([])
  const getCompanies = async () => {
    const response = await companyService.getAllCompanies();
    setCompanies(response.data);
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
        const response = await companyService.removeOne(id)
        getCompanies()
        toast.success(response.data.message)
      }
    })
  }
  

  useEffect(() => {
    getCompanies()
  }, [])
  return (
    <div className="card">
      <div className="card-header">
        <h3>List of companies</h3>
      </div>
      <div className="card-body">
        <Link className='btn btn-secondary my-4' to='/company/create'>Create company</Link>
        <table className="table table-hover table-striped">
          <thead>
            <tr style={{backgroundColor :'#46546C', color: 'white'}}>
              <th className='col-1 text-center'>#</th>
              <th className='col-2'>Name</th>
              <th className='col-3'>E-mail</th>
              <th className='col-2'>Role</th>
              <th className='col-2'>Photo</th>
              <th className='col-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              campanies.map((company, index) => {
                return (
                  <tr key={index} className="">
                    <td className='text-center'>{index + 1}</td>
                    <td>{company.companyName}</td>
                    <td>{company.email}</td>
                    <td>{company.role}</td>
                    <td><img src={company.photo} width='50px' height='50px' alt='' /></td>
                    <td className='text-center'>
                      <Link className='btn btn-info' to={'/company/update/' + company._id}><CIcon icon={cilPen} size="lg" style={{ color: 'white' }} /></Link>
                      <button className='btn btn-danger ms-3' onClick={() => handleDelete(company._id)} ><CIcon icon={cilTrash} size="lg" style={{ color: 'white' }} /></button>
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

export default ListCompanies