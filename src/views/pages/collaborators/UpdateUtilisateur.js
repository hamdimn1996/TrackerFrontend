import { Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import utilisateursService from 'src/views/services/collaborators';
import collaboratorService from 'src/views/services/collaborators';

function CreateUtilisateur() {
    const params = useParams()
    const [utilisateur, setUtilisateur] = useState()
    const [selectedRole, setSelectedRole] = useState()
    const roles = [
        { label: 'Collaborateur', value: 'Collaborateur' },
        { label: 'Administrateur', value: 'Administrateur' },
        { label: 'Responsable projet', value: 'Responsable projet' },
    ]
    const onChangeOptions = (e) => {
        setSelectedRole(e)
    }
    useEffect(() => {
        const getUser = async () => {
            const response = await utilisateursService.getOne(params.id);
            setUtilisateur(response.data)
            setSelectedRole({label:response.data.role,value:response.data.role})
        }
        getUser()
    }, [params.id])
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h3>Modifier un utilisateur</h3>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={utilisateur || {
                            nom: '',
                            prenom: '',
                            adress: '',
                            password: '',
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.nom) {
                                errors.nom = 'Required';
                            }
                            if (!values.prenom) {
                                errors.prenom = 'Required';
                            }
                            if (!values.adress) {
                                errors.adress = 'Required';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                            try {
                                values.role = selectedRole
                                const response = await collaboratorService.updateOne(params.id, values);
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
                                <label>Nom:</label>
                                <input
                                    type="text"
                                    name="nom"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nom}
                                    className="form-control mt-4"
                                    placeholder="Nom du collaborateur"
                                />
                                <p style={{ color: 'red' }}>{errors.nom && touched.nom && errors.nom}</p>
                                <label>Prénom:</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.prenom}
                                    className="form-control mt-4"
                                    placeholder="Prénom"
                                />
                                <p style={{ color: 'red' }}>{errors.prenom && touched.prenom && errors.prenom}</p>
                                <label>Adress e-mail:</label>
                                <input
                                    type="email"
                                    name="adress"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.adress}
                                    className="form-control mt-4"
                                    placeholder="Adress e-mail"
                                />
                                <p style={{ color: 'red' }}>{errors.adress && touched.adress && errors.adress}</p>
                                <label>Mot de passe:</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className="form-control mt-4"
                                    placeholder="Mot de passe"
                                />
                                <label>Role:</label>
                                <ReactSelect
                                    onChange={onChangeOptions}
                                    onBlur={handleBlur}
                                    value={selectedRole}
                                    options={roles}
                                />
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary my-3 px-5">
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

export default CreateUtilisateur