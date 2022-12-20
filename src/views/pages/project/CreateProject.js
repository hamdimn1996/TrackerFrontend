import { Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectService from 'src/views/services/projet';
import ReactSelect from 'react-select';
function CreateProject() {
    // const navigate = useNavigate()
    const [Utilisateurs, setUtilisateurs] = useState([])
    const [selectedUtilisateurs, setSelectedUtilisateurs] = useState([])
    const onChangeOptions = (e) => {
        setSelectedUtilisateurs(e)
    }
    useEffect(() => {
        const getUtilisateurs = async () => {
            const response = await projectService.getUsersForProjects();
            setUtilisateurs(response.data)
        }
        getUtilisateurs()
    }, [])
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h3>Ajouter un projet</h3>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={{
                            nomprojet: '',
                            descriptionprojet: '',
                            colaboratorlist:[]
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.nomprojet) {
                                errors.nomprojet = 'Required';
                            }
                            if (!values.descriptionprojet) {
                                errors.descriptionprojet = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                            try {
                                values.colaboratorlist = selectedUtilisateurs && selectedUtilisateurs
                                const response = await projectService.createOne(values);
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
                                <label>Nom du projet:</label>
                                <input
                                    type="text"
                                    name="nomprojet"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nomprojet}
                                    className="form-control mt-4"
                                    placeholder="Nom du projet"
                                />
                                <p style={{ color: 'red' }}>{errors.nomprojet && touched.nomprojet && errors.nomprojet}</p>
                                <label>Description:</label>
                                <textarea
                                    rows='5'
                                    type="text"
                                    name="descriptionprojet"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.descriptionprojet}
                                    className="form-control mt-4"
                                    placeholder="Description"
                                > </textarea>
                                <p style={{ color: 'red' }}>{errors.descriptionprojet && touched.descriptionprojet && errors.descriptionprojet}</p>
                                <label>Collaborateurs:</label>
                                <ReactSelect
                                    onChange={onChangeOptions}
                                    onBlur={handleBlur}
                                    isMulti
                                    options={Utilisateurs} />
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary px-5">
                                    Create
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default CreateProject