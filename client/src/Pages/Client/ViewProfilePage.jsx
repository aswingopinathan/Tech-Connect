import React from "react";
import NavBar from "../../components/NavBar";
import Profile from "../../components/Profile";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

import ViewProfile from "../../components/ViewProfile";

function ViewProfilePage() {
const location = useLocation()
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const [userdata, setUserData] = useState("");
  const [connectUpdate,setConnectUpdate] = useState(false)

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `/finduser?userId=${location.state.userId}`,
        config
      )
      .then((data) => {
        console.log("profile incoming data",data.data[0]);
        setUserData(data.data[0]);
      });

  }, [connectUpdate]);
  return (
    <ThemeProvider theme={darkTheme}>
      {mode === "light" ? (<Box bgcolor={"#e6e1e1"} color={"text.primary"}>
      <Stack justifyContent="space-between">
        <NavBar setMode={setMode} mode={mode} />
        <SideBar setMode={setMode} mode={mode} />
        <ViewProfile userdata={userdata} setConnectUpdate={setConnectUpdate} />
      </Stack>
      </Box>):(<Box bgcolor={"black"} color={"text.primary"}>
      <Stack justifyContent="space-between">
        <NavBar setMode={setMode} mode={mode} />
        <SideBar setMode={setMode} mode={mode} />
        <ViewProfile userdata={userdata}  setConnectUpdate={setConnectUpdate}/>
      </Stack> 
      </Box>)}
    </ThemeProvider>
  );
}

export default ViewProfilePage;
