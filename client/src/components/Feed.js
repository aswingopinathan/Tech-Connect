import { Box } from '@mui/material'

import React from 'react'
import Post from './Post'
import axios from "axios";
import {useEffect,useState} from 'react'


function Feed() {
  const [posts,setPosts] = useState([]);
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
  },[])
  return (
    <Box flex={4} p={2}>
      {posts?.map((post)=>(
      <Post post={post}/>
      ))}
    </Box>


  )
}

export default Feed