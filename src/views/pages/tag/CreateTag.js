import { Formik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TagService from 'src/views/services/tag';

function CreateTag() {
    const navigate = useNavigate()
    return (
        <div className="card">
            <div className="card-header">
                <h3>Create tag</h3>
            </div>
            <div className="card-body">
            <Formik
          initialValues={
            {
              title: '',
              description: '',
            }
          }
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if (!values.description) {
              errors.description = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            try {
              const response = await TagService.createOne(values);
              toast.success(response.data.message)
              navigate('../tag')
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
              <label>Event's title</label>
              <input
                type="text"
                name="title"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p style={{ color: 'red' }}>{errors.title && touched.title && errors.title}</p>
              <label>Description</label>
              <textarea
                type="text"
                name="description"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              ></textarea>
              <p style={{ color: 'red' }}>{errors.description && touched.description && errors.description}</p>
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

export default CreateTag