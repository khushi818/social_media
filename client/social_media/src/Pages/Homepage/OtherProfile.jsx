import React from 'react'
import { Box, Stack , Button, Typography} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const OtherProfile = () => {
  return (
    <Box borderLeft={"1px solid grey"} padding={"10px"}>
    <Box paddingTop={"20px"}>
 
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
    </Box>
    <Stack flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} gap={"20px"}>
        <Box width="150px" height= "150px" backgroundColor="grey" padding={"20px"} borderRadius="100%">
              
        </Box>
        <Button variant='contained'>Follow</Button>
        <Stack justifyContent={"center"} alignItems={"center"} flexDirection={"row"} gap="10px">
              <Typography variant="body2" fontWeight={"bold"}>23 followerer</Typography>
              <Typography variant="body2" fontWeight={"bold"}>23 following</Typography>
        </Stack>   
        <Typography variant='body1' fontWeight={200} textAlign={"center"} sx={{
            textOverflow: "ellipsis"
        }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In provident optio ea aliquid sunt suscipit sequi? Eligendi quod animi quos voluptatum culpa a excepturi fugiat officia corrupti, veritatis adipisci non.
        </Typography>
     </Stack>
     </Box>
  )
}

export default OtherProfile
