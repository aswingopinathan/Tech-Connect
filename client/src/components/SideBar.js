import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useNavigate} from 'react-router-dom'

function SideBar({mode,setMode}) {
const navigate = useNavigate();

  return (
    <Box  flex={1} 
    sx={{ display: { xs: "none",sm:"block" } }}>

      <Box position={"fixed"}>
      <List>
        
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <PeopleIcon/>
              </ListItemIcon>
              <ListItemText primary="Connections" />
            </ListItemButton>
          </ListItem>

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
    </Box>
  );
}

export default SideBar;
