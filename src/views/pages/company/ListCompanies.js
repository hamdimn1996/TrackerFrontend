import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import companyService from '../../services/company'

function ListCompanies() {
  const navigate = useNavigate()
  const [campanies, setCompanies] = useState([])
  
  const handleDelete = async (id) => {
    const response = await companyService.removeOne(id)
    getCompanies()
    toast.success(response.data.message)
  }
  const getCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      setCompanies(response.data)
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message)
      navigate('/login')
    }
  }
  useEffect(() => {
    
    getCompanies()
    return
  })
  return (
    <div className="card">
      <div className="card-header">
        <h3>Create company</h3>
      </div>
      <div className="card-body">
        <Link className='btn btn-secondary my-4' to='/company/create'>Create company</Link>
        <h1>ListCompanies</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className='col-1'>#</th>
              <th className='col-2'>Name</th>
              <th className='col-3'>E-mail</th>
              <th className='col-2'>Role</th>
              <th className='col-2'>Photo</th>
              <th className='col-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              campanies.map((company, index) => {
                return (
                  <tr key={index} className="">
                    <td>{index + 1}</td>
                    <td>{company.companyName}</td>
                    <td>{company.email}</td>
                    <td>{company.role}</td>
                    <td><img src={company.photo} width='70px' height='70px' alt='' /></td>
                    <td>
                      <Link className='btn btn-info my-4' to={'/company/update/' + company._id}><CIcon icon={cilPen} size="lg" style={{ color: 'white' }} /></Link>
                      <button className='btn btn-danger ms-3' onClick={()=> handleDelete(company._id)} ><CIcon icon={cilTrash} size="lg" style={{ color: 'white' }} /></button>
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