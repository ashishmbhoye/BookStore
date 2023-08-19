import React, { useContext, useState } from "react";
import { Typography, TextField, Button, FormHelperText } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { AuthContext } from "../../context/authContext";
import "./profile.css"

const UpdateProfile = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const initialValueState = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    newPassword: "",
    confirmPassword: ""
  }

  const [updatePassword, setUpdatePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    newPassword: Yup.string().min(5, "Minimum 5 charactor is required"),
    confirmPassword: updatePassword
      ? Yup.string()
          .required("Must required")
          .oneOf([Yup.ref("newPassword")], "Passwords is not match")
      : Yup.string().oneOf([Yup.ref("newPassword")], "Passwords is not match"),
  });

  // console.log("thisuser",user)

  const onSubmit = async (values) => {
    const password = values.newPassword ? values.newPassword : user.password;
    delete values.confirmPassword;
    delete values.newPassword;
    const data = Object.assign(user, { ...values, password });
    const res = await userService.updateProfile(data);
    if (res) {
      authContext.setUser(res);
      toast.success("Profile updated successfully",{position:"bottom-right"});
      navigate("/home");
    }
  };

  return (
    <div>
      <div className="profile-container">
        <Typography sx={{margin:5}} variant="h2">Update Profile</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <form action="" onSubmit={handleSubmit}>
                <div className="form-row-wrapper">
                  <div className="form-col">
                    <TextField
                      id="first-name"
                      name="firstName"
                      label="First Name *"
                      variant="outlined"
                      sx={{width:500}}
                      value={values.firstName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error> <ErrorMessage name='firstName' /> </FormHelperText>
                  </div>
                  <div className="form-col">
                    <TextField
                      id="last-name"
                      name="lastName"
                      label="Last Name *"
                      variant="outlined"
                      sx={{width:500}}
                      value={values.lastName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error> <ErrorMessage name='lastName' /> </FormHelperText>
                  </div>
                  <div className="form-col">
                    <TextField
                      id="email"
                      name="email"
                      label="Email *"
                      variant="outlined"
                      sx={{width:500}}
                      value={values.email}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error> <ErrorMessage name='email' /> </FormHelperText>
                  </div>
                  <div className="form-col">
                    <TextField
                      id="newPassword"
                      name="newPassword"
                      label="New Password "
                      variant="outlined"
                      sx={{width:500}}
                      value={values.newPassword}
                      inputProps={{ className: "small" }}
                      onChange={(e) => {
                        e.target.value !== ""
                          ? setUpdatePassword(true)
                          : setUpdatePassword(false);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error> <ErrorMessage name='newPassword' /> </FormHelperText>
                  </div>
                  <div className="form-col">
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password "
                      variant="outlined"
                      sx={{width:500}}
                      value={values.confirmPassword}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText error> <ErrorMessage name='confirmPassword' /> </FormHelperText>
                  </div>
                <div className="btn-wrapper">
                  <Button
                    sx={{":hover": {backgroundColor: "#d11932"}}}
                    variant="contained"
                    type="submit"
                    // onClick={() => {
                    //  navigate("/");
                    // }}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{":hover": {backgroundColor: "#d11932"}}}
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;