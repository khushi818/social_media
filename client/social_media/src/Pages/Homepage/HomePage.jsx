import React from 'react'
import { Grid , Box} from '@mui/material'
import Profile from './Profile'
import OtherProfile from './OtherProfile'
import Posts from './Posts'
import EditProfile from './EditProfile'
import CreatePost from './CreatePost'
import AddComment from './AddComment'

const HomePage = () => {
  return(
    <>
    {/* <AddComment/>a */}
    {/* <CreatePost/> */}
    {/* <EditProfile/> */}
  <Grid container >
   <Grid item xs={3}>
      <Profile/>
   </Grid>
   <Grid item xs={6} overflow={"scroll"}>
     <Posts/>
  </Grid>
   <Grid item xs={3} overflowY={"hidden"}>
    <OtherProfile/>
  </Grid>
     </Grid>
     </>
  )
}

export default HomePage
