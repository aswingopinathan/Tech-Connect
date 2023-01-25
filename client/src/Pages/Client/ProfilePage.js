import React from "react";
import NavBar from "../../components/NavBar";
import Profile from "../../components/Profile";
import SideBar from "../../components/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

function ProfilePage() {

  const axioInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  const [userupdate, setUserUpdate] = useState(false);
  const [userdata, setUserData] = useState("");
  console.log("userId", userId);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    axioInstance
      .get(
        `/finduser?userId=${userId}`,
        config
      )
      .then((data) => {
        console.log("profile incoming data",data.data[0]);
        setUserData(data.data[0]);
      });

  }, [userupdate]);
  return (
    <ThemeProvider theme={darkTheme}>
      {mode === "light" ? (<Box bgcolor={"#e6e1e1"} color={"text.primary"}>
      <Stack justifyContent="space-between">
        <NavBar setMode={setMode} mode={mode} />
        <SideBar setMode={setMode} mode={mode} />
        <Profile userdata={userdata} setUserUpdate={setUserUpdate} />
      </Stack>
      </Box>):(<Box bgcolor={"black"} color={"text.primary"}>
      <Stack justifyContent="space-between">
        <NavBar setMode={setMode} mode={mode} />
        <SideBar setMode={setMode} mode={mode} />
        <Profile userdata={userdata} setUserUpdate={setUserUpdate} />
      </Stack>
      </Box>)}
    </ThemeProvider>
  );
}

export default ProfilePage;
