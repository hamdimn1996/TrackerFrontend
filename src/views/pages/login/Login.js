import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [loginForm , setLoginForm] = useState({
    email:'',
    password:''
  })

  const handleChange = (e) => {
    const {id,value} = e.target
    setLoginForm(()=> {
      return {...loginForm,[id]:value}
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-light' style={{ minHeight: '100vh' }}>
      <div className='col-6 d-flex flex-column justify-content-center align-items-center bg-white p-5 rounded-4'>
        <h1 style={{ color: '#5141E0', marginBottom: '50px', textAlign: 'center' }}>SIGN IN TO DASHBOARD</h1>
        <form className='d-flex flex-column w-100' onSubmit={handleSubmit}>
          <label htmlFor='email' className='form-label text-black-50'>E-mail</label>
          <input type='email' onChange={handleChange} className='form-control' id='email' />
          <label htmlFor='password' className='form-label text-black-50'>Password</label>
          <input type='password' onChange={handleChange} className='form-control' id='password' />
          <button type='submit' className='btn btn-primary mt-3 px-5 align-self-center'>Sign In</button>
          <Link to={''} className='align-self-center mt-3 text-decoration-none'>Forgot your password?</Link>
          <span className='text-secondary align-self-center mt-3'>Don&apos;t have an account? <Link to='/register'>Click here</Link> to signup</span>
        </form>
      </div>
    </div>
  )
}

export default Login