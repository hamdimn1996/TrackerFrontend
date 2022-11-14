import React from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
const isExpiredToken = (token) => {
    const decoded = jwt_decode(token);
    return Math.floor(new Date().getTime()/1000)>=decoded.exp
}
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken')
    if (token !== null) {
        const expire = isExpiredToken(token)
        console.log(expire);
        if (expire) {
            toast.error('Token expired!')
            localStorage.removeItem('accessToken')
            return <Navigate to='/login' />
        } else {
            return children;
        }
    } else {
        localStorage.removeItem('accessToken')
        return <Navigate to='/login' />
    }
}
export default PrivateRoute
