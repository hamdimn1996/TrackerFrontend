import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import companyService from '../../services/company'

function UpdateCompany() {
  const navigate = useNavigate();
  const params = useParams();
  const [companyPhoto, setCompanyPhoto] = useState('')
  const [company, setCompany] = useState()
  let loadedData = company

  const onFileSelect = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64String = (reader.result).replace("data:", "").replace(/^.+,/, "")
      setCompanyPhoto("data:image/jpeg;base64," + base64String.toString())
    }
  }
  useEffect(() => {
    const getCompany = async () => {
      const response = await companyService.getOne(params.id)
      setCompany(response.data)
      setCompanyPhoto(response.data.photo)
    }
    getCompany()
  },[params.id])
  return (
    <div className="card">
      <div className="card-header">
        <h3>Create company</h3>
      </div>
      <div className="card-body">
        <Formik
          initialValues={loadedData || {
            companyName: '',
            companyDescription: '',
            email: '',
            password: '',
            role: 'Admin',
            photo: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.companyName) {
              errors.companyName = 'Required';
            }
            if (!values.role) {
              errors.role = 'Required';
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
            if (values.password && values.password.length <= 8) {
              errors.password = 'Password is short'
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            values.photo = company.photo
            try {
              const response = await companyService.updateOne(params.id, values);
              toast.success(response.data.message)
              navigate('../company')
            } catch (error) {
              toast.danger(error.response.data.message)
            }
          }}
          enableReinitialize
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
              <p style={{ color: 'red' }}>{errors.companyName && touched.companyName && errors.companyName}</p>
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
              <p style={{ color: 'red' }}>{errors.companyDescription && touched.companyDescription && errors.companyDescription}</p>
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
              <p style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</p>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password ? values.password :""}
                className="form-control mt-4"
                placeholder="Password"
              />
              <p style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</p>
              <label>Role:</label>
              <select
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
                className="form-control mt-4"
              >
                <option value='Admin'>Admin</option>
                <option value='Super_Admin'>Super Admin</option>
              </select>
              <p style={{ color: 'red' }}>{errors.role && touched.role && errors.role}</p>
              <input
                type="file"
                name="photo"
                onChange={onFileSelect}
                onBlur={handleBlur}
                className="form-control mt-4"
              />
              <img src={companyPhoto} alt='' width='200px' className="d-block my-4" />
              <button type="submit" disabled={isSubmitting} className="btn btn-primary px-5">
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateCompany