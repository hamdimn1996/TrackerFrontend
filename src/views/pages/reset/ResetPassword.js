import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassword() {
    const params = useParams()
    const navigate = useNavigate()
    const [reset, setReset] = useState({
        password: '',
        confirmPassword: ''
    })
    const handleChange = (e) => {
        const { id, value } = e.target;
        setReset(
            { ...reset, [id]: value }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (reset.confirmPassword === reset.password) {
                const response = await axios.put('http://localhost:4000/app/v1/resetPassword/' + params.token, reset)
                console.log(response);
                toast.success(response.data.message)
                navigate('/login')
            }else{
                toast.error('Passwords not identical')
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }
    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center bg-light' style={{ minHeight: '100vh' }}>
            <div className='col-6 d-flex flex-column justify-content-center align-items-center bg-white p-5 rounded-4'>
                <h1 style={{ color: '#5141E0', marginBottom: '50px', textAlign: 'center' }}>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' id='password' onChange={handleChange} />
                    <input className='form-control' id='confirmPassword' onChange={handleChange} />
                    <input type='submit' className='btn btn-primary' />

                </form>
            </div>
        </div>
    )
}

export default ResetPassword