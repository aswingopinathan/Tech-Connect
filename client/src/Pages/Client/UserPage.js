import React, { useEffect, useState } from "react";
// import UserHeader from "../../components/UserHeader";
import Feed from "../../components/Feed";
import RightBar from "../../components/RightBar";
import SideBar from "../../components/SideBar";
import Box from '@mui/material/Box';
import { Stack } from "@mui/system";
import NavBar from "../../components/NavBar";
import Add from "../../components/Add";
import { createTheme, ThemeProvider } from "@mui/material";
// import { getUser } from "../../api/UserRequest";

function UserPage() {

  const [mode,setMode]=useState("light");
const darkTheme=createTheme({
  palette:{
    mode:mode
  }
})

  return (
    
      <ThemeProvider theme={darkTheme}>
        {mode === "light"?(<Box bgcolor={"#e6e1e1"} color={"text.primary"}>
        <NavBar setMode={setMode} mode={mode}/>
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        
      <SideBar setMode={setMode} mode={mode}/>
      <Feed/>
      <RightBar/>

      </Stack>

      <Add/>

      </Box>):(<Box bgcolor={"black"} color={"text.primary"}>
        <NavBar setMode={setMode} mode={mode}/>
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        
      <SideBar setMode={setMode} mode={mode}/>
      <Feed/>
      <RightBar/>

      </Stack>

      <Add/>

      </Box>)}
      </ThemeProvider>
      
        
  );
}

export default UserPage;
