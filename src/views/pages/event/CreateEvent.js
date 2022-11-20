import { Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import eventService from 'src/views/services/event';

const CreateEvent = () => {
  const navigate = useNavigate()
  const [eventPhoto, setEventPhoto] = useState({
    photo: ''
  })

  const onFileSelect = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64String = (reader.result).replace("data:", "").replace(/^.+,/, "")
      setEventPhoto({ ...eventPhoto, [e.target.name]: "data:image/jpeg;base64," + base64String.toString() })
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <h3>Create event</h3>
      </div>
      <div className="card-body">
        <Formik
          initialValues={
            {
              eventName: '',
              eventDescription: '',
              eventDate: '',
              eventTime: '',
              price: 0,
              availableTicketNumber: 0,
              location: '',
              eventType: '',
              photo: ''
            }
          }
          validate={values => {
            const errors = {};
            if (!values.eventName) {
              errors.eventName = 'Required';
            }
            if (!values.eventDescription) {
              errors.eventDescription = 'Required';
            }
            if (!values.eventDate) {
              errors.eventDate = 'Required';
            }
            if (!values.eventTime) {
              errors.eventTime = 'Required';
            }
            if (!values.price && values.eventType === 'Paid') {
              errors.price = 'Required';
            }
            if (!values.availableTicketNumber) {
              errors.availableTicketNumber = 'Required';
            }
            if (!values.location) {
              errors.location = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            values.photo = eventPhoto.photo
            values.eventType === 'Free' && (values.price = 0)
            try {
              const response = await eventService.createOne(values);
              toast.success(response.data.message)
              navigate('../event')
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
                name="eventName"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.eventName}
              />
              <p style={{ color: 'red' }}>{errors.eventName && touched.eventName && errors.eventName}</p>
              <label>Description</label>
              <textarea
                type="text"
                name="eventDescription"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.eventDescription}
              ></textarea>
              <p style={{ color: 'red' }}>{errors.eventDescription && touched.eventDescription && errors.eventDescription}</p>
              <label>Event date</label>
              <input
                type="date"
                name="eventDate"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.eventDate}
              />
              <p style={{ color: 'red' }}>{errors.eventDate && touched.eventDate && errors.eventDate}</p>
              <label>Event time</label>
              <input
                type="time"
                name="eventTime"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.eventTime}
              />
              <p style={{ color: 'red' }}>{errors.eventTime && touched.eventTime && errors.eventTime}</p>
              <label>Available ticket number</label>
              <input
                type="number"
                name="availableTicketNumber"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.availableTicketNumber}
              />
              <p style={{ color: 'red' }}>{errors.availableTicketNumber && touched.availableTicketNumber && errors.availableTicketNumber}</p>
              <div className='d-flex align-items-center'>
                <label>Event type:</label>
                <div className="form-check d-flex align-items-center mx-3">
                  <input
                    type="radio"
                    name="eventType"
                    id='free'
                    className='form-check-input'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value='Free'
                  />
                  <label htmlFor='free'>Free</label>
                </div>
                <div className="form-check d-flex align-items-center mx-3">
                  <input
                    type="radio"
                    name="eventType"
                    id='paid'
                    className='form-check-input'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value='Paid'
                  />
                  <label htmlFor='paid'>Paid</label>
                </div>
                <p className='text-danger'> {errors.eventType && touched.eventType && errors.eventType}</p>
              </div>
              {values.eventType === 'Paid' ? 
                <>
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    className='form-control'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </>
              :  null}
              <p style={{ color: 'red' }}>{errors.price && touched.price && errors.price}</p>
              <label>Location</label>
              <input
                type="text"
                name="location"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
              />
              <p style={{ color: 'red' }}>{errors.location && touched.location && errors.location}</p>
              <label>Photo</label>
              <input
                type="file"
                name="photo"
                onChange={onFileSelect}
                onBlur={handleBlur}
                className="form-control"
              />
              <img src={eventPhoto.photo} alt='' width='200px' className="d-block my-4" />
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
export default CreateEvent;