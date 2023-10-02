import React from "react";
import { Stack } from "@mui/material";
import { ToastContainer } from "react-toastify";
const Authentication = ({ children }) => {
  return(
    <>
    <ToastContainer/> 
  <Stack
     boxSizing={"border-box"}
     display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"100%"}
    height={"100vh"}
    marginInline={"auto"}
  >
    {children}
    </Stack>;
  </> 
  )
};

export default Authentication;
