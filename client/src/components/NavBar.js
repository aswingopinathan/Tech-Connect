import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Mail from "@mui/icons-material/Mail";
import Notifications from "@mui/icons-material/Notifications";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "theme.shape.borderRadius",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({ display:"flex", alignItems:"center",gap:"20px"}));

function NavBar({mode,setMode}) {

    const [open, setOpen] = useState(false)
const navigate = useNavigate();
let imageUrl=JSON.parse(localStorage.getItem('userInfo'))?.pic
let userName=JSON.parse(localStorage.getItem('userInfo'))?.name

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          TECH CONNECT
        </Typography>
        <ConnectWithoutContactIcon
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <Search sx={{padding:"0px"}}>
          {mode==="dark"?<InputBase placeholder="search... " sx={{bgcolor:"black",width:"100%",paddingLeft:"10px"}}/>:
          <InputBase placeholder="search... " sx={{paddingLeft:"10px"}} borderRadius="40px"/>}
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>

          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <span>{userName}</span>

          <Avatar 
          sx={{width:30,height:30,cursor:"pointer"}}
          alt="Remy Sharp" src={imageUrl} 
          onClick={(e)=>setOpen(true)}/>

        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={open}
        onClose={(e)=>setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={()=>{
        navigate('/profile')}}>Profile</MenuItem>
        {/* <MenuItem >My account</MenuItem> */}
        <MenuItem onClick={()=>{
        localStorage.removeItem("userInfo");
        navigate('/')}}>
          Logout
          </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
