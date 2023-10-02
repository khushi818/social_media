import React,{useState} from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import Modal from '../../Components/Modal'
import {TextField} from '@mui/material'
import { useFormik } from 'formik'

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const formik = useFormik({
    initialValues: {  
      Name: "",
      bio:""
    },
    onSubmit: async (values) => {
    //   alert(JSON.stringify(values, null, 2));
    //   console.log(values);
    //   const formdata = new FormData();
    //   let key: any;
    //   const val: any = { ...values };
    //   for (key in val) {
    //     formdata.append(key, val[key]);
    //   }
    //   formdata.append("productImage", productImage);

    //   const config = {
    //     headers: {
    //       "Content-type": "multipart/form-data",
    //       // headers: { "Content-Type": "multipart/form-data" },
    //     },
    //     transformRequest: (formData: any) => formData,
    //   };

    //   // console.log(formdata);
    //   await axios
    //     .post(`${BASE_URL}/api/v1/product`, formdata, config)
    //     .then(() => console.log("success"));
    },
  });

  return (
     <Modal>
         <Box
           display={"flex"}
           flexDirection={"column"}
           backgroundColor="white"
           padding="20px"
           borderRadius={"25px"}
           gap={"20px"}
        sx={{
          justifyContent: "right",
          alignItems: "center",
        }}
        >
            <Typography variant='h5' color="#1976d2">Edit Profile</Typography>
            <Box
            component={"img"}
            src={profileImage ? URL.createObjectURL(profileImage) : ""}
            sx={{
              marginBlock: "20px",
              width: "100px",
            }}
          />
          <input
            required
            id="profileImage"
            name="profileImage"
            accept=".png, .jpg, .jpeg"
            type="file"
            onChange={(e) => {
              setProfileImage(e.target.files[0]);
            }}
          />
        <TextField
          required
          fullWidth
          id="Name"
          name="Name"
          label="Name"
          value={formik.values.Name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.Name && Boolean(formik.errors.Name)
          }
          helperText={formik.touched.Name && formik.errors.Name}
        />

        <TextField
          required
          fullWidth
          id="bio"
          name="bio"
          label="bio"
          multiline
          row={4}
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bio &&
            Boolean(formik.errors.bio)
          }
          helperText={
            formik.touched.bio &&
            formik.errors.bio
          }
        />
       <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} gap={"20px"}>           
       <Button variant="contained">Save</Button>
       <Button variant='outlined'>Cancel</Button>
       </Stack>
       </Box>  
       
     </Modal>
  )
}

export default EditProfile
