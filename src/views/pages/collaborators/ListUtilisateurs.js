import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import utilisateursService from 'src/views/services/collaborators'

function ListUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const getUtilisateurs = async () => {
    const response = await utilisateursService.getAllUtilisateurs();
    setUtilisateurs(response.data);
  }
  const handleDelete = async (id) => {
    const response = await utilisateursService.removeOne(id)
    getUtilisateurs()
    toast.success(response.data.message)
  }
  useEffect(() => {
    getUtilisateurs()
  }, [])
  return (
    <div className="card">
      <div className="card-header">
        <h3>Liste des utilisateurs</h3>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped ">
          <thead>
            <tr style={{backgroundColor :'#46546C', color: 'white'}}>
              <th className='col-1 text-center'>#</th>
              <th className='col-2'>Nom</th>
              <th className='col-2'>Prénom</th>
              <th className='col-2'>Adress</th>
              <th className='col-2'>role</th>
              <th className='col-3 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              utilisateurs.map((e, index) => {
                return (
                  <tr key={index}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{e.nom}</td>
                    <td>{e.prenom}</td>
                    <td>{e.adress}</td>
                    <td>{e.role}</td>
                    <td className=''>
                      <Link className='btn btn-info' to={'/utilisateurs/modifier/' + e._id}><CIcon icon={cilPen} size="lg" style={{ color: 'white' }} /></Link>
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

export default ListUtilisateurs