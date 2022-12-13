import React from 'react'
import NavBar from '../../components/NavBar'
import Profile from '../../components/Profile'
import SideBar from '../../components/SideBar'
import axios from "axios";
import {useEffect,useState} from 'react'
import { createTheme, ThemeProvider } from "@mui/material";

function ProfilePage() {
  const [mode,setMode]=useState("light");
const darkTheme=createTheme({
  palette:{
    mode:mode
  }
})
  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
  
  const [userupdate,setUserUpdate] = useState(false)
  const [userdata,setUserData] = useState('')
// console.log('token',token);
console.log('userId',userId);

  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization :`Bearer ${token}`
      },
    };
    axios.get(`/finduser?userId=${userId}`,
    // { userId: userId },
    config).then((data)=>{
      // console.log('data.data[0]',data.data[0]);
      setUserData(data.data[0])
    })
     // eslint-disable-next-line
  },[userupdate])
  return ( 
    <ThemeProvider theme={darkTheme}>
    <div>
      <NavBar setMode={setMode} mode={mode}/>
      <SideBar setMode={setMode} mode={mode}/>
      <Profile userdata={userdata} setUserUpdate={setUserUpdate} setMode={setMode} mode={mode}/>
    </div>
    </ThemeProvider>
  )
}

export default ProfilePage