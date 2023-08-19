import { Box, Button, FormHelperText,  TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { GlobalStyles } from '../../styles/globalStyles'
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from "yup";
import authService from '../../services/authService';
import { toast } from 'react-toastify';
import  Cookies  from "js-cookie" 
import { AuthContext } from '../../context/authContext';
const LoginForm = () => {
  
  const navigate = useNavigate();
  const userContext = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("Password is required")
  });

  const handleSubmit = async(values) => {
    
    await authService.Login(values).then((response) => {
      if(response && response.status === 200){
        toast.success("User Logged In Successfully",{position:"bottom-right"});
        navigate("/home");
        Cookies.set("auth_email", values.email);
        userContext.setUser(response.data);
      }
    })
    .catch((error) => {
      console.log(error)
      toast.error("Login Failed",{position:"bottom-right"});
    })
  }

  return (
    <div style={GlobalStyles.form}>
      <Box sx={{width:1100,height:560, display:"flex",justifyContent:"center",alignItems:"center",boxShadow:16}}>
        <Box sx={{width:600,height:560,color:"white", display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center", backgroundColor:"#FF5733"}}>
        <Typography variant="h4" >New Customer</Typography>
        <Typography variant="subtitle1" >Registration is free and easy</Typography>
        <Typography component={'span'} variant="body1">
          <ul>
            <li>Faster checkout</li>
            <li>Save multiple shopping addresses</li>
            <li>View and track orders and more</li>
          </ul>
          

          <Button sx={{width:300,color:"#FF5733",backgroundColor:'white',":hover": {color: "white"}}} variant="text" onClick={()=>{navigate("/regform");}} > Create an Account </Button>
        </Typography>
        </Box>

        <Formik initialValues={{ email: "", password: ""}} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
          {({values,setFieldValue}) => {
            return(
              <Form>
                <Box sx={{width:750,height:560, display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center",  background: "linear-gradient(80deg, #FF5733, white)" }}>
                  <Typography variant="h2" sx={{color:"orangered"}}>Login</Typography>
                  <TextField sx={{width:300, paddingBottom:2}} id='email' name='email' label="Email Address" variant="outlined"  value={values.email} onChange={(e) => setFieldValue("email", e.target.value)}/>
                  <FormHelperText error> <ErrorMessage name='email' /> </FormHelperText>
                  <TextField sx={{width:300,paddingBottom:2}} id='password' name='password' label="Password" type='password' variant="outlined"  value={values.password} onChange={(e) => setFieldValue("password", e.target.value)}/>
                  <FormHelperText error> <ErrorMessage name='password' /> </FormHelperText>
                  <Button sx={{width:300,background: '#FF5733'}}  type="submit" variant="h3"  ><b>Login</b>  </Button>
                </Box>
              </Form>
            )
          }}
        </Formik>

      </Box>
    </div>
  )
}

export default LoginForm


// InputProps={{style: {borderRadius: "40px", }}}  for textfield
// background: 'linear-gradient(to right bottom,#ff445d,#fd78b8)'