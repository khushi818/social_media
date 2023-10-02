import { Box, Stack , Button, Typography} from '@mui/material'
import React from 'react'

const Profile = () => {
  return (
    <Box borderRight={"1px solid grey"} padding={"10px"} overflow={"hidden"}>
      <Typography variant='h6' textAlign={"center"}>Your profile</Typography>
     <Stack  flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} gap={"20px"}>
        <Box width="150px" height= "150px" backgroundColor="grey" padding={"20px"} borderRadius="100%">
              
        </Box>
        <Button variant='contained'>Edit Profile</Button>
        <Stack justifyContent={"center"} alignItems={"center"} flexDirection={"row"} gap="10px">
              <Typography variant="body2" fontWeight={"bold"}>23 followerer</Typography>
              <Typography variant="body2" fontWeight={"bold"}>23 following</Typography>
        </Stack>   
        <Typography variant='body1' fontWeight={200} textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In provident optio ea aliquid sunt suscipit sequi? Eligendi quod animi quos voluptatum culpa a excepturi fugiat officia corrupti, veritatis adipisci non.
        </Typography>
          <Stack display={"flex"} justifyContent="left" alignItems={"left"} width={"100%"}>
     
    </Stack>
    <Button variant='contained'>Logout</Button>   
     </Stack>
      
   </Box>
  )
}

export default Profile
