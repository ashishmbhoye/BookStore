import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
// import ValidationErrorMessage from "../../../components/ValidationErrorMessage/index";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import "./UserPage.css"

const EditUserPage = () => {
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const initialValues = {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    roleId: 3,
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (id) {
      getUserById();
    }

  }, [id]);

  useEffect(() => {
    if (user && roles.length) {
      const roleId = roles.find((role) => role.name === user?.role)?.id;
      setInitialValueState({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        roleId,
        password: user.password,
      });
    }
  }, [user, roles]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    roleId: Yup.number().required("Role is required"),
  });

  const getRoles = () => {
    userService.GetAllRoles().then((res) => {
      if (res) {
        setRoles(res.data.result);
      }
    });
  };

  const getUserById = () => {
    userService.getById(Number(id)).then((res) => {
      if (res) {
        setUser(res.data.result);
      }
    });
  };

  const onSubmit = (values) => {
    const updatedValue = {
      ...values,
      role: roles.find((r) => r.id === values.roleId).name,
    };
    userService
      .updateUser(updatedValue)
      .then((res) => {
        if (res) {
            toast.success("User updated successfully",{position:"bottom-right"});
          navigate("/user");
        }
      })
      .catch((e) => toast.error("user record cannot be updated",{position:"bottom-right"}));
  };
  return (
    <div>
      <div className="user-edit-container">
        <Typography variant="h2" sx={{margin:5}}>Edit User</Typography>
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
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name *"
                    variant="outlined"
                    sx={{width:500}}
                    inputProps={{ className: "small" }}
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error> <ErrorMessage name='firstName' /> </FormHelperText>
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="last-name"
                    name="lastName"
                    label="Last Name *"
                    sx={{width:500}}
                    value={values.lastName}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <FormHelperText error> <ErrorMessage name='lastName' /> </FormHelperText>
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    label="Email *"
                    sx={{width:500}}
                    value={values.email}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <FormHelperText error> <ErrorMessage name='email' /> </FormHelperText>
                </div>
                {/* {values.id !== authContext.user.id && ( */}
                  <div className="form-col">
                    <FormControl
                      className="dropdown-wrapper"
                      variant="outlined"
                    >
                      <InputLabel htmlFor="select">Roles</InputLabel>
                      <Select
                        name="roleId"
                        id={"roleId"}
                        sx={{width:500}}
                        onChange={handleChange}
                        value={values.roleId}
                      >
                        {roles.length > 0 &&
                          roles.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                {/* )} */}
              <div className="btn-wrapper">
                <Button
                  sx={{":hover": {backgroundColor: "#d11932"}}}
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  sx={{":hover": {backgroundColor: "#d11932"}}}
                  variant="contained"
                  type="button"
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  Cancel
                </Button>
              </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUserPage