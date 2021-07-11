import React, { useState, useEffect } from 'react'
import "../Styles/LandingPage.scss"
import axios from "../Request/Axios"
import * as Yup from 'yup';
import Map from "../Pages/Map"
import {
    ErrorMessage, Form, Formik,
} from 'formik';
function LandingPage() {
    const [user, setuser] = useState([]);
    const [data, setdata] = useState([]);
    const [error, seterror] = useState("");
    const [location, setlocation] = useState("");
    useEffect(() => {
        let isActive = true;
        axios
            .get("/users")
            .then((data) => isActive && setuser(data.data))
            .catch((err) => seterror(err.message))

        return () => {
            isActive = false;
        };
    }, [])
    const initialValues = {
        name: "",
        title: "",
        body: "",
    };
    const Validation = Yup.object({
        name: Yup.string().required('Please select a user'),
        title: Yup.string().min(5, 'title must be atleast 5 characters').required('title required'),
        body: Yup.string().min(10, "body must be atleast 10 characters").required('body required'),
    });
    const OnSubmit = (values) => {
        axios.post("/posts", {
            title: values.title,
            body: values.body
        }
        )
            .then((data) => {
                setdata(data.data)
            })
            .catch(err => {
                seterror(err.message)
            })
    }
    const getdata = (e) => {
        const data = document.getElementById("name")
        const value = data.value;
        const main = user.find((data) => data.name === value);
        setlocation(main)
    }
    return (
        <div className="formdetails">
            <div className="container">
                <div className="main d-flex">
                    <img src="/logo.png" alt="" />
                    <h5><span>ADmyBRAND</span> coding-challenge-frontend</h5>
                    <div className="result">
                        {error && (
                            <h5 className="error">Error Occured : {error}</h5>
                        )}
                    </div>
                </div>
                <Formik initialValues={initialValues} validationSchema={
                    Validation
                } onSubmit={
                    (values, { resetForm }) => {
                        OnSubmit(values)
                        resetForm({ values: "" })
                    }
                }
                >
                    {({
                        values, errors, touched, handleChange, handleBlur,
                    }) => (
                        <Form>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="name" className="label">Select the User</label>
                                        <select id="name" name="name" onClick={getdata} className={`form-select ${errors.name && touched.name ? ' is-invalid' : ''}`} value={values.name} onChange={handleChange} onBlur={handleBlur}>
                                            <option value=""></option>
                                            {user.map((user) => <option id="option" value={user.name} key={user.id} lang={user.address.geo.lng} lat={user.address.geo.lat} >{user.name}</option>)}
                                        </select>
                                        <ErrorMessage data-testid="nameError" name="name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="title" className="label">Title</label>
                                        <input id="title" type="text" name="title" placeholder="title" className={`form-control ${errors.title && touched.title ? ' is-invalid' : ''}`} value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="title" data-testid="titleError" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="body" className="label">Body</label>
                                        <input type="text" id="body" name="body" placeholder="body" className={`form-control${errors.body && touched.body ? ' is-invalid' : ''}`} value={values.body} onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="body" data-testid="bodyError" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" data-testid="Submit" className="btn">Submit</button>
                        </Form>
                    )}
                </Formik>
                <Map LATITUDE={location?.address?.geo?.lat} LONGITUDE={location?.address?.geo?.lng} />
            </div>
        </div>
    )
}

export default React.memo(LandingPage);
