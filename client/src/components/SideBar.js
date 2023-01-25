import { Avatar, Box, List, ListItem,ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {Link, useNavigate} from 'react-router-dom'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAllUsers, getConnections } from "../api/UserRequest";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SideBar({mode,setMode}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const navigate = useNavigate();

const [users, setUsers] = useState([]);
const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
const getMyConnections = async (userId) => {
  try {
    let { data } = await getConnections(userId);
    console.log("sidebar incoming data", data[0].connectionIds);
    setUsers(data[0].connectionIds);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Box  flex={1} 
    sx={{ display: { xs: "none",sm:"block" },marginTop:'1rem' }}>

      <Box position={"fixed"}>
      <List>
        

          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile" onClick={e=>{navigate('/profile')}}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <DarkModeIcon/>
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode==="light"?"dark":"light")}/>
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title"
           variant="h6"
            component="h2"
            textAlign="center"
            sx={{ color: "text.primary" }}
            >
            My Connections
          </Typography>

          {users?.map((user)=>(
            <div key={user} style={{display:'flex'}}>
              <div>
              <ListItemAvatar>
                    <Link
                      to="/viewprofile"
                      state={{ userId: user }}
                    >
                      <Avatar alt="" src={user.pic} />
                    </Link>
                  </ListItemAvatar>
              </div>
                  <div>
                  <ListItemText primary={user} />
                  </div>
            </div>
          ))}
        </Box>
      </Modal>
    </Box>
  );
}

export default SideBar;
