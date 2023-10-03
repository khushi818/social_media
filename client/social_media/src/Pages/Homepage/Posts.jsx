import React,{useState, useEffect} from 'react'
import { Stack, Box, Typography, Divider , Paper} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import axios from 'axios'

const Posts = () => {
   const [posts , setPosts] = useState([])
   const [profile, setProfile] = useState([])
   const showProfile = async(e) => {

    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      await axios.get('/users', {} , config).then(response => {setPosts([...response.data.user.posts])
         setProfile(response.data.user) 
         console.log(response.data.user.posts) })

   }

  console.log(posts)
   useEffect(()=>{
     showProfile()
   },[])
  return (
   
    <Stack flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} gap={"30px"} display={"flex"} marginTop={"30px"}>
    {posts && posts.map((val,idx)=>{
      return(
         <Box display="flex" justifyContent="space-around" alignItems="left" flexDirection="column" width={"30rem"} minwidth={"300px"} 
          gap={"20px"} padding={"40px"} backgroundColor={"#8e98fb"}  borderRadius={"25px"}>
           <Stack display="flex" justifyContent={"left"} gap="10px" alignItems={"center"} flexDirection={"row"}>
              <Box width="40px" height= "40px" backgroundColor="grey" borderRadius="100%">
                   <Box component={"img"} src={profile?.profileImage?.url}  width={"40px"} height={"40px"}  borderRadius={"100%"}></Box>
              </Box>
               
              <Typography variant="body1">{profile.name}</Typography>
           </Stack>
           <Typography variant='body1'>{val.description}</Typography>
           <Divider/>
           <Stack display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexDirection={"row"}>
             <FavoriteBorderIcon/> 
             <AddCommentIcon/>                                          
           </Stack>      
           <Box display="flex" justifyContent={"center"} alignItems={"center"}>
           <ExpandCircleDownIcon/>
           </Box>
           <Paper elevation={2} backgroundColor="white" >
            <Stack display="flex" justifyContent="space-between" alignItems="center" flexDirection={"row"}  padding={"20px"}>
            <Stack display="flex" justifyContent={"left"} gap="10px" alignItems={"center"} flexDirection={"row"}>
            <Box width="20px" height= "20px" backgroundColor="grey" padding={"20px"} borderRadius="100%">
                   
              </Box>
               
              <Typography variant="body1">Jay</Typography>  
              </Stack>
              <ExpandCircleDownIcon/>
              </Stack>
              <Box padding={"0px 25px"} >
              <Typography component="p"overflow="hidden" whiteSpace={"nowrap"} textOverflow={"ellipsis"} >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eligendi quo. Itaque molestiae, voluptatibus deleniti impedit cum quos soluta, aliquid labore alias, sint amet enim modi architecto voluptas mollitia laborum.</Typography>
              </Box>
                <Divider/>
                 <Stack display="flex" justifyContent="space-between" alignItems="center" flexDirection={"row"}  padding={"20px"}>
            <Stack display="flex" justifyContent={"left"} gap="10px" alignItems={"center"} flexDirection={"row"}>
            <Box width="20px" height= "20px" backgroundColor="grey" padding={"20px"} borderRadius="100%">
                   
              </Box>
               
              <Typography variant="body1">Jay</Typography>  
              </Stack>
              <ExpandCircleDownIcon/>
              </Stack>
              <Box padding={"0px 25px"} >
              <Typography component="p"overflow="hidden" whiteSpace={"nowrap"} textOverflow={"ellipsis"} >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eligendi quo. Itaque molestiae, voluptatibus deleniti impedit cum quos soluta, aliquid labore alias, sint amet enim modi architecto voluptas mollitia laborum.</Typography>
              </Box>
           </Paper>
         
         </Box>
    )})}
    </Stack>
  )
}

export default Posts
