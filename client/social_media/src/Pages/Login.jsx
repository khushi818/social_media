import { TextField, Typography, Button, Box , Paper} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Authentication from "../Components/Authentication";
import { useGlobalContext } from "../context/GlobalContext";
import axios from "axios";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login = () => {
  const navigate = useNavigate();
  const {showErrorToastMessage, showSucessToastMessage, setToken} = useGlobalContext()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
       const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        '/auth/login',
        values,
        config,
        { withCredentials: true}
      ).then(response=>{
        setToken(response.data.token) 
        showSucessToastMessage("you are logged in")
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
        Login In
      </Typography>
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
        Login
      </Button>
    </Box>
    </Paper>
    </Authentication>
  );
};

export default Login;

