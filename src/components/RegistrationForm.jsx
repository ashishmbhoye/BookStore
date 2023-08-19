import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GlobalStyles } from '../styles/globalStyles'
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from "yup";
import authService from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegistrationForm = () => {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be 5 characters at minimum")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Password and Confirm Password must be match."
      )
      .required("Confirm Password is required."),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    // roleId: Yup.number().required("Role is required"),
  });

  const handleSubmit = async (values) => {

    // const payload = {
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email,
    //     roleId: 2,
    //     password: values.password
    // };

    delete values.confirmPassword;
    values.roleId = 1;
    // values.role = "buyer";

    console.log("payload", values)

    await authService.Register(values).then((res) => {
      console.log("this", res);
      if (res && res.status === 200) {
        toast.success("Data Submitted successfully", {
          position: "bottom-right",
        });
      }
    }).catch((error) => {
      toast.error("unable to submit the data", { postion: "bottom-right" })
    })
  };

  return (
    <Formik initialValues={{ firstName: "", lastName: "", password: "", confirmPassword: "", email: "" }} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
      {({ values, errors, setFieldValue, handleBlur }) => {
        return (

          <div style={{ display: "flex", height: 700, justifyContent: 'center' }}>
            <div >
              <Form>

                <div style={GlobalStyles.form} >


                  <Box sx={{ width: 600, height: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", boxShadow: "10" }}>

                    <Typography variant="h3" sx={{ color: "red", marginBottom: 7 }}>Register</Typography>

                    <TextField sx={{ marginBottom: 1, width: 500 }} label="First Name" name='firstName' variant="outlined" error={!!errors.firstName} onBlur={handleBlur} value={values.firstName} onChange={(e) => setFieldValue("firstName", e.target.value)} />
                    <FormHelperText error><ErrorMessage name='firstName' /></FormHelperText>

                    <TextField sx={{ marginBottom: 1, width: 500 }} label="Last Name" name='lastName' variant="outlined" error={!!errors.lastName} onBlur={handleBlur} value={values.lastName} onChange={(e) => setFieldValue("lastName", e.target.value)} />
                    <FormHelperText error><ErrorMessage name='lastName' /></FormHelperText>

                    <TextField sx={{ marginBottom: 1, width: 500 }} label="Password" name='password' variant="outlined" error={!!errors.password} onBlur={handleBlur} value={values.password} onChange={(e) => setFieldValue("password", e.target.value)} />
                    <FormHelperText error> <ErrorMessage name='password' /></FormHelperText>

                    <TextField sx={{ marginBottom: 1, width: 500 }} label="Confirm Password" name='confirmPassword' variant="outlined" error={!!errors.confirmPassword} onBlur={handleBlur} value={values.confirmPassword} onChange={(e) => setFieldValue("confirmPassword", e.target.value)} />
                    <FormHelperText error> <ErrorMessage name='confirmPassword' /></FormHelperText>

                    <TextField sx={{ marginBottom: 1, width: 500 }} label="Email" name="email" variant="outlined" error={!!errors.email} onBlur={handleBlur} value={values.email} onChange={(e) => setFieldValue("email", e.target.value)} />
                    <FormHelperText error><ErrorMessage name='email' /></FormHelperText>

                    <Button variant="text" type="submit" style={{marginBottom:20}} >submit </Button>
                  </Box>

                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  )
}

export default RegistrationForm