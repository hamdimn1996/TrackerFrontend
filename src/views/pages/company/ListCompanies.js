import React from 'react'
import { Link } from 'react-router-dom'

function ListCompanies() {
  return (
    <div>
        <Link className='btn btn-secondary' to='/company/create'>Create company</Link>
        <h1>ListCompanies</h1></div>
  )
}

export default ListCompanies