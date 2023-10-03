import React,{useState} from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import Modal from '../../Components/Modal'
import {TextField} from '@mui/material'
import { useFormik } from 'formik'
import { useGlobalContext } from '../../context/GlobalContext'
import axios from 'axios'


const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const {setOpenEditProfile} = useGlobalContext()
  const formik = useFormik({
    initialValues: {  
      name: "",
      bio:""
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("bio", values.bio)
      formdata.append("profileImage", profileImage);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          // "Accept":"application/json, text/plain, */*"
        },
        transformRequest: (formData) => formData,
      };

      await axios
        .patch(`/users`, formdata, config)
        .then(() => {
          console.log("success")
           setOpenEditProfile(false)
        }).catch(err => console.log(err));
    },
  });

  return (
     <Modal>
         <Box
           component={"form"}
           display={"flex"}
           flexDirection={"column"}
           backgroundColor="white"
          action="/upload"
        encType="multipart/form-data"
           padding="20px"
           width={"500px"}
           borderRadius={"25px"}
           gap={"20px"}
           onSubmit={formik.handleSubmit}
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
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.name && Boolean(formik.errors.name)
          }
          helperText={formik.touched.name && formik.errors.name}
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
       <Button variant="contained" type="submit">Save</Button>
       <Button variant='outlined' onClick={()=>setOpenEditProfile(false)}>Cancel</Button>
       </Stack>
       </Box>  
       
     </Modal>
  )
}

export default EditProfile
