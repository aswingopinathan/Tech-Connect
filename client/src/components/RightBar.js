import { Box, ListItemText, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
// import AvatarGroup from "@mui/material/AvatarGroup";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { getAllUsers } from "../api/UserRequest";
import axios from "axios";
import { UserContext } from "../context/Context";

function RightBar() {


const [users,setUsers] = useState([])
useEffect(()=>{
  const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  const allUsers= async (userId)=>{
    try {
      let { data } = await getAllUsers(userId);
      // console.log('rightbar',data);
      setUsers(data);
    } catch (error) { 
      console.log(error);
    }
  }
  allUsers(userId);
},[])

let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;


let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

const { setTrigger } = useContext(UserContext);


const connectUser = async (id) => {
  await axios
    .post(
      "/connectuser",
      {
        userId: userId,
        connectUserId: id,
      },
      config
    )
    .then(() => {
      setTrigger(Math.random());

    });
};

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "none",md: "block" }}} >
      <Box position="fixed" width={300} paddingTop='1rem'>
        {/* <Typography variant="h6" fontWeight={100}>
          Online Friends
        </Typography>
        <AvatarGroup max={5}>
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Travis Howard"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <Avatar
            alt="Agnes Walker"
            src="https://material-ui.com/static/images/avatar/4.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/5.jpg"
          />
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/6.jpg"
          />
          <Avatar
            alt="Travis Howard"
            src="https://material-ui.com/static/images/avatar/7.jpg"
          />
        </AvatarGroup> */}
       

        <Typography variant="h6" fontWeight={100} mt={1}>
          People you may know
        </Typography>
        
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',borderRadius:'2rem', marginTop:'1rem' }}>
          
        {users.map((usersall,index)=>(
           <div key={index}>
          <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={usersall.pic} />
        </ListItemAvatar>
        <ListItemText
          primary={usersall.name}
          secondary={
            <div style={{display:'flex',justifyContent:'end'}}>
              <div>
              <Typography
                sx={{ display: 'inline' ,cursor:'pointer'}}
                component="span"
                variant="body2"
                color="text.primary"
                onClick={()=>{
                  console.log('connect in right clicked')
                  console.log('usersall._id',usersall._id);
                  connectUser(usersall._id)
                  }}
              >
                +Connect
              </Typography>
              </div>
              
            </div>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{width:"70%"}}/>
          </div>
        ))}

    </List>
      </Box>
    </Box>
  );
}

export default RightBar;
