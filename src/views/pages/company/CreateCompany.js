import { Formik } from "formik";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import companyService from '../../services/company'

function CreateCompany() {
  const navigate = useNavigate()
  const [companyPhoto, setCompanyPhoto] = useState({
    photo: ''
  })

  const onFileSelect = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64String = (reader.result).replace("data:", "").replace(/^.+,/, "")
      setCompanyPhoto({ ...companyPhoto, [e.target.name]: "data:image/jpeg;base64," + base64String.toString() })
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <h3>Create company</h3>
      </div>
      <div className="card-body">
        <Formik
          initialValues={{
            companyName: '',
            companyDescription: '',
            email: '',
            password: '',
            role: 'Admin'
          }}
          validate={values => {
            const errors = {};
            if (!values.companyName) {
              errors.companyName = 'Required';
            } 
            if (!values.companyDescription) {
              errors.companyDescription = 'Required';
            } 
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (values.password && values.password.length < 8 ){
              errors.password = 'Password is short'
            }
            return errors;
          }}
          onSubmit={ async (values, { setSubmitting }) => {
              setSubmitting(false);
              companyPhoto.photo && (values.photo = companyPhoto.photo)
              try {
                const response = await companyService.createOne(values);
                toast.success(response.data.message)
                navigate('../company')
              } catch (error) {
                toast.danger(error.response.data.message)
              }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <label>Company"s name:</label>
              <input
                type="text"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                className="form-control mt-4" 
                placeholder="Name" 
              />
              <p style={{color:'red'}}>{errors.companyName && touched.companyName && errors.companyName}</p>
              <label>Description:</label>
              <input
                type="text"
                name="companyDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyDescription}
                className="form-control mt-4" 
                placeholder="Description" 
              />
              <p style={{color:'red'}}>{errors.companyDescription && touched.companyDescription && errors.companyDescription}</p>
              <label>E-mail:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="form-control mt-4" 
                placeholder="E-mail" 
              />
              <p style={{color:'red'}}>{errors.email && touched.email && errors.email}</p>
              <label>Description:</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="form-control mt-4" 
                placeholder="Password"
              />
              <p style={{color:'red'}}>{errors.password && touched.password && errors.password}</p>
              <input
                type="file"
                name="photo"
                onChange={onFileSelect}
                onBlur={handleBlur}
                className="form-control mt-4" 
              />
              <img src={companyPhoto.photo} alt='' width='200px' className="d-block my-4" />
              <button type="submit" disabled={isSubmitting} className="btn btn-primary px-5">
                Create
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateCompany