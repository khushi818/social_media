import { TextField, Typography, Button, Box, Paper } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Authentication from "../Components/Authentication";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { useGlobalContext } from "../context/GlobalContext";
const validationSchema = yup.object({
  email: yup.string().email().required().matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter the right format"
  ),
  password: yup.string().min(8).required()
  .matches(/^(?=.*[a-z])/, "Must Contain One LowercaseA Character")
  .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
  .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
  .matches(
    /^(?=.*[!@#\$%\^&\*])/,
    "Must Contain  One Special Case Character"
  ),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {showSucessToastMessage, showErrorToastMessage, setToken} = useGlobalContext()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        '/auth/signup',
        values,
        config
      ).then(response=> {
        setToken(response.data.token)
        showSucessToastMessage("you are signed up")
        navigate('/')
      }).then(err=> showErrorToastMessage(err))
    },
  });
  
  return (
    <Authentication>
      <Paper elevation={2}>
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      width={"620px"}
      padding={"20px"}
      gap={"30px"}
      onSubmit={formik.handleSubmit}
    >
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          color: "#0d507d",
        }}
      >
         SignUp
      </Typography>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        
      />

      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        // onClick={() => navigate("/")}
        sx={{
          marginTop: "10px",
        }}
      >
        SignUp
      </Button>
    </Box>
    </Paper>
    </Authentication>
  );
};

export default SignUp;
