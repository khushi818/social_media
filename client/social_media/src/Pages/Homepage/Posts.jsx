import React,{useState} from 'react'
import { Stack, Box, Typography, Divider , Paper} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const Posts = () => {
   const [posts , setPosts] = useState([])
  return (
    <Stack flexDirection={"column"} justifyContent={"center"} alignItems={"center"} display={"flex"} marginTop={"30px"}>
         <Box display="flex" justifyContent="space-around" alignItems="left" flexDirection="column" width={"30rem"} minwidth={"300px"} 
          gap={"20px"} padding={"40px"} backgroundColor={"#8e98fb"}  borderRadius={"25px"}>
           <Stack display="flex" justifyContent={"left"} gap="10px" alignItems={"center"} flexDirection={"row"}>
              <Box width="40px" height= "40px" backgroundColor="grey" padding={"20px"} borderRadius="100%">
                   
              </Box>
               
              <Typography variant="body1">Jay</Typography>
           </Stack>
           <Typography variant='body1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel omnis doloremque praesentium soluta autem fugiat ipsam ducimus perspiciatis, harum sint veritatis numquam. Tempora, eligendi vitae blanditiis in quisquam iste sed.</Typography>
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
    </Stack>
  )
}

export default Posts
