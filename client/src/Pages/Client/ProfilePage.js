import React from 'react'
import NavBar from '../../components/NavBar'
import Profile from '../../components/Profile'
import SideBar from '../../components/SideBar'
import axios from "axios";
import {useEffect,useState} from 'react'

function ProfilePage() {
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
    axios.get(`/getuser?userId=${userId}`,
    // { userId: userId },
    config).then((data)=>{
      // console.log('data.data[0]',data.data[0]);
      setUserData(data.data[0])
    })
     // eslint-disable-next-line
  },[userupdate])
  return (
    <div>
      <NavBar/>
      <SideBar/>
      <Profile userdata={userdata} setUserUpdate={setUserUpdate}/>
    </div>
  )
}

export default ProfilePage