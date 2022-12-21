import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import projectService from 'src/views/services/projet'

function ListProject() {
  const [projects, setProjects] = useState([])
  const getProjects = async () => {
    const response = await projectService.getAllProjects();
    setProjects(response.data);
  }
  const handleDelete = async (id) => {
    const response = await projectService.removeOne(id)
    getProjects()
    toast.success(response.data.message)
  }
  useEffect(() => {
    getProjects()
  }, [])
  return (
    <div className="card">
      <div className="card-header">
        <h3>Liste des projets</h3>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr style={{backgroundColor :'#46546C', color: 'white'}}>
              <th className='col-1 text-center'>#</th>
              <th className='col-2'>Nom</th>
              <th className='col-3'>Description</th>
              <th className='col-3 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              projects.map((e, index) => {
                return (
                  <tr key={index} className="">
                    <td className='text-center'>{index + 1}</td>
                    <td>{e.nomprojet}</td>
                    <td>{e.descriptionprojet}</td>
                    <td className=''>
                      <Link className='btn btn-info' to={'/projets/modifier/' + e._id}><CIcon icon={cilPen} size="lg" style={{ color: 'white' }} /></Link>
                      <button className='btn btn-danger ms-3' onClick={() => handleDelete(e._id)} ><CIcon icon={cilTrash} size="lg" style={{ color: 'white' }} /></button>
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

export default ListProject