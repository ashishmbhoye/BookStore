import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Typography, TextField, Button, FormHelperText } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { toast } from "react-toastify";
import bookService from "../../services/bookService";
import "./CategoryPage.css"

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    bookService.getOneCategoryById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.data.result.id,
        name: res.data.result.name,
      });
    });
  };

  const onSubmit = (values) => {
    bookService
      .addeditcategory(values)
      .then((res) => {
        toast.success("Category has been added successfully",{position:"bottom-right"});
        navigate("/category");
      })
      .catch((e) => toast.error("category record cannot be updated",{position:"bottom-right"}));
  };
  return (
    <div>
      <div className="edit-category-container">
        <Typography sx={{margin:5}} variant="h2">{id ? "Edit" : "Add"} Category</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
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
                    name="name"
                    label="Category Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error> <ErrorMessage name='name' /> </FormHelperText>
                </div>
              </div>
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
                    navigate("/category");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCategoryPage;