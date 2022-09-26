import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [registerForm, setRegisterForm] = useState({
    companyName: '',
    companyDescription: '',
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
    await axios.post('http://localhost:4000/app/v1/register', registerForm)
  }
  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-light' style={{ minHeight: '100vh' }}>
      <div className='col-6 d-flex flex-column justify-content-center align-items-center bg-white p-5 rounded-4'>
        <h1 style={{ color: '#5141E0', marginBottom: '50px', textAlign: 'center' }}>SIGN UP</h1>
        <form className='d-flex flex-column w-100' onSubmit={handleSubmit}>
          <label htmlFor='companyName' className='form-label text-black-50'>Company Name</label>
          <input type='text' onChange={handleChange} className='form-control mb-3' id='companyName' />
          <label htmlFor='companyDescription' className='form-label text-black-50'>Description</label>
          <input type='text' onChange={handleChange} className='form-control mb-3' id='companyDescription' />
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