import React,{useState} from 'react'
import { Box, Button, Stack, Typography, Divider } from '@mui/material'
import Modal from '../../Components/Modal'
import {TextField} from '@mui/material'
import { useFormik } from 'formik'

const CreatePost = () => {
  const [postImage, setPostImage] = useState(null);
  const formik = useFormik({
    initialValues: {  
      Title: "",
      Description:""
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
           width={"760px"}
           borderRadius={"25px"}
           gap={"40px"}
           sx={{
            justifyContent: "right",
            alignItems: "center",
          }}
        >
            <Typography variant='h5' color="#1976d2">Add Post</Typography>
            <Box
            component={"img"}
            display={postImage ? '' : 'none'}
            src={postImage ? URL.createObjectURL(postImage) : ""}
            sx={{
              marginBlock: "20px",
              width: "100px",
            }}
          />
          
        <TextField
          required
          fullWidth
          id="Title"
          name="Title"
          variant='filled'
          border={"1px solid grey"}
          placeholder="Title"
          value={formik.values.Title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.Title && Boolean(formik.errors.Title)
          }
          helperText={formik.touched.Title && formik.errors.Title}
        />
        <Box width="100%" border={"1px solid grey"}>
        <TextField
          required
          fullWidth
          variant='filled'
          id="Description"
          maxRow={4}
          name="Description"
          label="Description"
          multiline
          value={formik.values.Description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.Description &&
            Boolean(formik.errors.Description)
          }
          helperText={
            formik.touched.Description &&
            formik.errors.Description
          }
        />
        <Divider/>
        <Box component= "input"
            required
            id="postImage"
            name="postImage"
            accept=".png, .jpg, .jpeg"
            type="file"
            onChange={(e) => {
              setPostImage(e.target.files[0]);
            }}
          />
        </Box>
        
         
       <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"} gap={"20px"}>           
       <Button variant="contained">Create</Button>
       <Button variant='outlined'>Cancel</Button>
       </Stack>
       </Box>
    </Modal>  
  )
}


export default CreatePost
