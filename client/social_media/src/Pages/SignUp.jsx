import { TextField, Typography, Button, Box, Paper } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Authentication from "../Components/Authentication";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  // .matches(/^(?=.*[a-z])/, "Must Contain One LowercaseA Character")
  // .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
  // .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
  // .matches(
  //   /^(?=.*[!@#\$%\^&\*])/,
  //   "Must Contain  One Special Case Character"
  // ),
});

const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      
      console.log(values);
    },
  });

  // const isRequirementMet = (regex: RegExp) => {
  //   return regex.test(formik.values.password);
  // };

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
        id="Name"
        name="Name"
        label="Name"
        value={formik.values.Name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.Name && Boolean(formik.errors.Name)}
        helperText={formik.touched.Name && formik.errors.Name}
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
        onClick={() => navigate("/")}
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
