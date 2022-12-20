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
import React, { useContext, useEffect } from "react";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Mail from "@mui/icons-material/Mail";
import Notifications from "@mui/icons-material/Notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from '@mui/icons-material/Search';
import { getUser } from "../api/UserRequest";
import { UserContext } from '../context/Context';
import Button from '@mui/material/Button';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderradius: "theme.shape.borderradius",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

function NavBar({ mode, setMode }) {
  const{notifications, setNotifications}=useContext(UserContext)

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  let imageUrl = JSON.parse(localStorage.getItem("userInfo"))?.pic;
  let userName = JSON.parse(localStorage.getItem("userInfo"))?.name;
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  useEffect(()=>{
    const getUserData = async () => {
      try {
        // console.log('chatbox',userId);
        const { data } = await getUser(userId);
        setUserData(data.data);
        // console.log("navbar", data);
      } catch (error) { 
        console.log(error);
      }
    };
     getUserData();
  },[])
  // console.log('userData',userData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const newopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          TECH CONNECT
        </Typography>
        <ConnectWithoutContactIcon
          sx={{ display: { xs: "block", sm: "none" },cursor:'pointer' }}
          onClick={()=>{navigate('/user')}}
        />
        <SearchIcon
          sx={{ display: { xs: "block", sm: "none" }, cursor:'pointer' }}
          // onClick={}
        />

        <Search sx={{ padding: "0px",display: { xs: "none", sm: "block" } }}>
          {mode === "dark" ? (
            <InputBase
              placeholder="search... "
              sx={{ bgcolor: "black", width: "100%", paddingLeft: "10px" }}
            />
          ) : (
            <InputBase
              placeholder="search... "
              sx={{ paddingLeft: "10px" }}
              borderradius="40px"
            />
          )}
        </Search>
        <Icons>
          <Badge
            badgeContent={1}
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              navigate("/user");
            }}
          >
            <HomeIcon />
          </Badge>

          {/* <Badge badgeContent={2}
          color="error"
          sx={{ cursor: "pointer" }}
            onClick={(e) => {
              navigate("/user");
            }}
          >
            <PeopleIcon />
          </Badge> */}

          {/* <Badge>
            <WorkIcon />
          </Badge> */}

          <Badge badgeContent={4}
           color="error"
           sx={{ cursor: "pointer" }}
           onClick={(e) => {
             navigate("/chat");
           }}>
            <Mail />
          </Badge>


          {/* <Badge badgeContent={1} color="error">
            <Notifications />
          </Badge> */}
          <>
          <Button
        id="basic-button"
        aria-controls={newopen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={newopen ? 'true' : undefined}
        onClick={handleClick}
      >
        {/* Dashboard */}
        <Badge badgeContent={1} color="error">
            <Notifications color="error"/>
          </Badge>

      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={newopen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          {/* Profile */}
          {!notifications.length && "No new messages" }
          </MenuItem>
        
      </Menu></>
          {/* <Menu>
            <MenuItem>
            {!notifications.length && "No new messages" }
            </MenuItem>
          </Menu> */}

          <span>{userName}</span>

          <Avatar
            sx={{ width: 30, height: 30, cursor: "pointer" }}
            alt="Remy Sharp"
            src={imageUrl}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </MenuItem>
        {/* <MenuItem >My account</MenuItem> */}
        <MenuItem
          onClick={() => {
            localStorage.removeItem("userInfo");
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
