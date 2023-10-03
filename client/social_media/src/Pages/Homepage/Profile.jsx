import { Box, Stack , Button, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
   const {setOpenEditProfile} = useGlobalContext()
   const [profileData, setProfileData] = useState({})
   

   const showProfile = async(e) => {

    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      await axios.get('/users', {} , config).then(response => {setProfileData(response.data.user) 
         console.log(profileData) })
   }


   useEffect(()=>{
     showProfile()
   })

   const  navigate = useNavigate()
   const handleChange = async(e) =>{
       e.preventDefault()
         const config = {
        headers: {
          "Content-type": "application/json",
        },
      }; 
       await axios.post('/auth/logout',{}, config)
       navigate('/login')
  }

  return (
    <Box borderRight={"1px solid grey"} padding={"10px"} overflow={"hidden"}>
      <Typography variant='h6' textAlign={"center"}>Your profile</Typography>
      <Stack   flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} gap={"20px"}>
        <Box width="150px" height= "150px" backgroundColor="grey" borderRadius="100%" >
            <Box component={"img"} src={profileData?.profileImage?.url}  width={"150px"} height={"150px"}  borderRadius={"100%"}></Box>   
        </Box>
        <Button variant='contained' onClick={()=>{
          setOpenEditProfile(true)
        }}>Edit Profile</Button>
        <Stack justifyContent={"center"} alignItems={"center"} flexDirection={"row"} gap="10px">
              <Typography variant="body2" fontWeight={"bold"}>0 followerer</Typography>
              <Typography variant="body2" fontWeight={"bold"}>0  followings</Typography>
        </Stack>   
        <Typography variant='body1' fontWeight={200} textAlign={"center"}>
          {profileData?.bio}
        </Typography>
          <Stack display={"flex"} justifyContent="left" alignItems={"left"} width={"100%"}>
    </Stack>
      
     <Button variant='contained' onClick={handleChange}>Logout</Button> 
     </Stack>
        
   </Box>
  )
}

export default Profile
