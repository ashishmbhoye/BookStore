import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {Typography, TextField, Button, Input, FormControl, InputLabel, MenuItem, Select,} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import bookService from "../../services/bookService";
import { ErrorMessage, Formik } from "formik";
// import ValidationErrorMessage from "../../../components/ValidationErrorMessage/index";
import { toast } from "react-toastify";
import { FormHelperText } from "@mui/material";
import "./AdminBookPage.css"

const EditBookPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if(id){
        getBookById();
    } 
    bookService.GetAllCategories().then((res) => {
      setCategories(res.data.result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
  });

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.data.result.id,
        name: res.data.result.name,
        price: res.data.result.price,
        categoryId: res.data.result.categoryId,
        description: res.data.result.description,
        base64image: res.data.result.base64image,
      });
    });
  };

  // console.log("ids", initialValueState)
  // console.log("only",id)

  const onSubmit = (values) => {
    console.log("value",values)
    bookService
      .addeditbook(values)
      .then((res) => {
        toast.success("Book Added successfully",{position:"bottom-right"});
        navigate("/books");
      })
      .catch((e) => toast.error("record cannot be updated",{position:"bottom-right"}));
  };

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 50000) {
          toast.error("File size must be less then 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };
  return (
    <div>
      <div className="edit-book-container">
        <Typography sx={{margin:5}} variant="h2">{id ? "Edit" : "Add"} Book</Typography>
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
            setValues,
            setFieldError,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="name"
                    label="Book Name *"
                    variant="outlined"
                    sx={{width:500}}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error> <ErrorMessage name='name' /> </FormHelperText>
                </div>

                <div className="form-col">
                  <TextField
                    type={"number"}
                    id="price"
                    name="price"
                    label="Book Price (RS)*"
                    variant="outlined"
                    sx={{width:500}}
                    inputProps={{ className: "small" }}
                    value={values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error> <ErrorMessage name='price' /> </FormHelperText>
                </div>

                <div className="form-col">
                  <FormControl className="dropdown-wrapper" variant="outlined">
                    <InputLabel htmlFor="select">Category *</InputLabel>
                    <Select
                      name={"categoryId"}
                      id={"category"}
                      sx={{width:500}}
                      onChange={handleChange}
                      value={values.categoryId}
                    >
                      {categories?.map((rl) => (
                        <MenuItem value={rl.id} key={"category" + rl.id}>
                          {rl.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormHelperText error> <ErrorMessage name='categoryId' /> </FormHelperText>
                </div>
                {/* <img src={values.imageSrc} alt="asa" /> */}
                <div className="form-col">
                  {!values.base64image && (
                    <>
                      {" "}
                      <label
                        htmlFor="contained-button-file"
                        className="file-upload-btn"
                      >
                        <Input
                          id="contained-button-file"
                          type="file"
                          inputProps={{ className: "small" }}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            onSelectFile(e, setFieldValue, setFieldError);
                          }}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          sx={{":hover": {backgroundColor: "#d11932"}}}
                        >
                          Upload
                        </Button>
                      </label>
                      <FormHelperText error> <ErrorMessage name='base64image' /> </FormHelperText>
                    </>
                  )}
                  {values.base64image && (
                    <div className="uploaded-file-name">
                      <em>
                        <img src={values.base64image} alt="" />
                      </em>
                      image{" "}
                      <span
                        onClick={() => {
                          setFieldValue("base64image", "");
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}
                </div>
                <div className="form-col full-width description">
                  <TextField
                    id="description"
                    name="description"
                    label="Description *"
                    variant="outlined"
                    sx={{width:500}}
                    value={values.description}
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error> <ErrorMessage name='description' /> </FormHelperText>
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
                    navigate("/books");
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

export default EditBookPage;
