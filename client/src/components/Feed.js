import { Box } from '@mui/material'
import React, { useContext } from 'react'
import Post from './Post'
import axios from "axios";
import {useEffect,useState} from 'react'
import { UserContext } from '../context/Context';


function Feed() {
  const{trigger}=useContext(UserContext)
  const [posts,setPosts] = useState([]);
const [liked,setLiked] = useState(false);

  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization :`Bearer ${token}`
      },
    };
    axios.get('/getpost',config).then((data)=>{
      console.log(data);
      setPosts(data.data)
    })
     // eslint-disable-next-line
  },[liked,trigger])
  return (
    <Box flex={4} p={2}>
      {posts?.map((post)=>(
      <Post post={post} setLiked={setLiked}/>
      ))}
    </Box>
  )
}

export default Feed