import { Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import projectService from 'src/views/services/projet';

function UpdateProject() {
    const params = useParams()
    const [project, setProject] = useState()
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
        const getProject = async() => {
            const response = await projectService.getOne(params.id);
            setProject(response.data)
            let usersSelected = []
            response.data.colaboratorlist.map(e => {
              return usersSelected.push({label:`${e.nom} ${e.prenom}`,value:e._id})
            })
            setSelectedUtilisateurs(usersSelected)
          }
          getProject()
    }, [params.id])
  return (
    <>
            <div className="card">
                <div className="card-header">
                    <h3>Modifier un projet</h3>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={project || {
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
                                const response = await projectService.updateOne(params.id,values);
                                toast.success(response.data.message)
                                window.location.reload()
                                // navigate('../projets')
                            } catch (error) {
                                console.log(error);
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
                                    value={selectedUtilisateurs}
                                    options={Utilisateurs} />
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary px-5">
                                    Modifier
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
  )
}

export default UpdateProject