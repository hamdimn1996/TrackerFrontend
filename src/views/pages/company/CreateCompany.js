import React, { useState } from "react"

function CreateCompany() {
  const [companyForm, setCompany] = useState({
    companyName:'',
    companyDescription:'',
    email:'',
    password:'',
    role:'Admin',
    photo:''
  })
  
  const onFileSelect = ()=> {

  }
  const handleChange = (e) => {
    const {id,value} = e.target
  }
  const handleSubmit = (e) => {

  }
  return (
    <div className="card">
      <div className="card-header">
        <h3>Create company</h3>
      </div>
      <div className="card-body">
        <form className="form-group" onSubmit={handleSubmit}>
          <label>Company"s name:</label>
          <input type="text" id="companyName" onChange={handleChange}className="form-control mb-4" placeholder="Name" />
          <label>Description:</label>
          <input type="text" id="companyDescription" onChange={handleChange}className="form-control mb-4" placeholder="Description" />
          <label>E-mail:</label>
          <input type="email" id="email" onChange={handleChange}className="form-control mb-4" placeholder="E-mail" />
          <label>Password:</label>
          <input type="password" id="password" onChange={handleChange}className="form-control mb-4" placeholder="Password" />
          <label>Photo:</label>
          <input type="file" onChange={onFileSelect} className="form-control mb-4" />
          <button className="btn btn-primary px-5" type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCompany