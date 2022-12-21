import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()
  const [registerForm, setRegisterForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setRegisterForm(() => {
      return { ...registerForm, [id]: value }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/createAdmin', registerForm)
      toast.success(response.data.message)
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message)  
    }
    
  }
  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-light' style={{ minHeight: '100vh' }}>
      <div className='col-6 d-flex flex-column justify-content-center align-items-center bg-white p-5 rounded-4'>
        <h1 style={{ color: '#5141E0', marginBottom: '50px', textAlign: 'center' }}>SIGN UP</h1>
        <form className='d-flex flex-column w-100' onSubmit={handleSubmit}>
          <label htmlFor='nom' className='form-label text-black-50'>Nom</label>
          <input type='text' onChange={handleChange} className='form-control mb-3' id='nom' />
          <label htmlFor='prenom' className='form-label text-black-50'>Description</label>
          <input type='text' onChange={handleChange} className='form-control mb-3' id='prenom' />
          <label htmlFor='email' className='form-label text-black-50'>E-mail</label>
          <input type='email' onChange={handleChange} className='form-control mb-3' id='email' />
          <label htmlFor='password' className='form-label text-black-50'>Password</label>
          <input type='password' onChange={handleChange} className='form-control mb-3' id='password' />
          <button type='submit' className='btn btn-primary mt-3 px-5 align-self-center'>Sign In</button>
          <span className='text-secondary align-self-center mt-3'>Already have an account? <Link to='/login'>Click here</Link> to sign in</span>
        </form>
      </div>
    </div>
  )
}

export default Register