import React from "react";
import { Stack } from "@mui/material";
const Authentication = ({ children }) => {
  return <Stack
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
};

export default Authentication;
