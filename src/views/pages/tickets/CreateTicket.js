import React, { useEffect, useState  } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import ReactSelect from 'react-select';
import ticketService from 'src/views/services/ticket';

function CreateTicket() {
    const [Projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState([])
    const onChangeOptions = (e) => {
        setSelectedProject(e)
        console.log(e);
    }
    useEffect(() => {
        const getUtilisateurs = async () => {
            const response = await ticketService.getProjectsForTicket();
            setProjects(response.data)
        }
        getUtilisateurs()
    }, [])
  
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h3>Ajouter un ticket</h3>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={{
                            nomticket: '',
                            descriptionticket: '',
                            projectid: ''
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.nomticket) {
                                errors.nomticket = 'Required';
                            }
                            if (!values.descriptionticket) {
                                errors.descriptionticket = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                            try {
                                values.projectid = selectedProject && selectedProject[0].value
                                const response = await ticketService.createOne(values);
                                toast.success(response.data.message)
                                window.location.reload()
                                // navigate('../projets')
                            } catch (error) {
                                console.log(error);
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
                                <label>Nom du ticket:</label>
                                <input
                                    type="text"
                                    name="nomticket"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nomticket}
                                    className="form-control mt-4"
                                    placeholder="Nom du ticket"
                                />
                                <p style={{ color: 'red' }}>{errors.nomticket && touched.nomticket && errors.nomticket}</p>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="descriptionticket"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.descriptionticket}
                                    className="form-control mt-4"
                                    placeholder="Description"
                                /> 
                                <p style={{ color: 'red' }}>{errors.descriptionticket && touched.descriptionticket && errors.descriptionticket}</p>
                                <ReactSelect
                                    onChange={onChangeOptions}
                                    onBlur={handleBlur}
                                    isMulti
                                    options={Projects} />
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary px-5">
                                    Ajouter
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default CreateTicket