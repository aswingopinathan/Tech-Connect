import { Box } from '@mui/material'
import React, { useContext } from 'react'
import Post from './Post'
import axios from "axios";
import {useEffect,useState} from 'react'
import { UserContext } from '../context/Context';


function Feed() {
  const axioInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const{trigger}=useContext(UserContext)
  const [posts,setPosts] = useState([]);
const [liked,setLiked] = useState(false);
  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

 const { uniquePost } = useContext(UserContext)

  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization :`Bearer ${token}`
      },
    };
    if(uniquePost){
      axioInstance.get(`/getpost/${uniquePost}`,config).then((data)=>{
        setPosts(data.data)
      })
    }else{
      axioInstance.get('/getpost',config).then((data)=>{
        setPosts(data.data)
      })
    }

     // eslint-disable-next-line 
  },[liked,trigger,uniquePost])
  return (
    <Box flex={4} p={2}>
      {posts?.map((post,index)=>(
      <Post post={post} key={index} setLiked={setLiked} />
      ))}
    </Box>
  )
}

export default Feed