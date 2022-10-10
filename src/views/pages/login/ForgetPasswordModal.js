import axios from 'axios'
import React, { Component } from 'react'
import { toast } from 'react-toastify'

export class ForgetPasswordModal extends Component {
    state = {
        email: ''
    }
    getEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    close = ()=>{
        return    this.props.hide
    }
    handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/app/v1/forgetPassword', this.state)
            toast.success(response.data.message)
            this.close()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    render() {
        return (
            <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" onClick={this.props.hide} ></button>
                        </div>
                        <div className="modal-body">
                            <p>Email:</p>
                            <input type='email' className='form-control my-3' onChange={this.getEmail} />
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-secondary me-3' onClick={this.props.hide} >Return</button>
                            <button className='btn btn-primary' onClick={this.handleSubmit} >Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgetPasswordModal