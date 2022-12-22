import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Mail from "@mui/icons-material/Mail";
import Notifications from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import { getUser } from "../api/UserRequest";
import { UserContext } from "../context/Context";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRef } from 'react';
import {io} from 'socket.io-client'

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
  const { notifications, setNotifications, updateNav } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  // let imageUrl = JSON.parse(localStorage.getItem("userInfo"))?.pic;
  // let userName = JSON.parse(localStorage.getItem("userInfo"))?.name;
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  useEffect(() => {
    const getUserData = async () => {
      try {
        // console.log('chatbox',userId);
        const { data } = await getUser(userId);
        setUserData(data);
        // console.log("navbar", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [updateNav]);
  // console.log('userData.name',userData?.name);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const newopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // for search menu
  const [dataReceived, setDataReceived] = useState(false);

  const [anchorE2, setAnchorE2] = React.useState(null);
  const newopen1 = Boolean(anchorE2);
  const handleClick1 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorE2(null);
  };

  // console.log('query',query);

  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const searching = async (queryinput) => {
    console.log("queryinput", queryinput);
    try {
      let { data } = await axios.get(`/search/${queryinput}`, config);
      // console.log("data1", data);
      [data] = data;
      // console.log("data2", data);
      setDataReceived(data);
      // console.log("data.name", data.name);
      if (queryinput.length > 4) {
        setAnchorE2(true);
      } else {
        setAnchorE2(false);
        // setDataReceived(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  // if(dataReceived){
  //   setAnchorE2(true)
  // }
  // const [onlineUsers,setOnlineUsers] = useState([])
  const socket = useRef()
 useEffect(()=>{
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add",userId)
        socket.current.on('get-users',(users)=>{
            // setOnlineUsers(users)
            // console.log('onlineUsers',onlineUsers);
            console.log('for socket to work');
        })
    },[userId])

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          TECH CONNECT
        </Typography>
        <ConnectWithoutContactIcon
          sx={{ display: { xs: "block", sm: "none" }, cursor: "pointer" }}
          onClick={() => {
            navigate("/user");
          }}
        />
        <SearchIcon
          sx={{ display: { xs: "block", sm: "none" }, cursor: "pointer" }}
          // onClick={}
        />

        <Search sx={{ padding: "0px", display: { xs: "none", sm: "block" } }}>
          {mode === "dark" ? (
            <InputBase
              placeholder="search... "
              sx={{ bgcolor: "black", width: "100%", paddingLeft: "10px" }}
              onChange={(e) => {
                searching(e.target.value);
                /////////
              }}
            />
          ) : (
            <div>
              <InputBase
                placeholder="search... "
                sx={{ paddingLeft: "10px",
                width:"100%",
                // position:"relative"
              }}
                borderradius="40px"
                onChange={(e) => {
                  searching(e.target.value);
                }}
              />
              {/*  */}

              <Menu
                id="basic-menu"
                anchorE2={anchorE2}
                open={newopen1}
                onClose={handleClose1}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                // sx={{position:"absolute",right:"0"}}
              >
                <MenuItem
                >
                  <ListItemAvatar>
                    <Link to="/viewprofile" state={{ userId: dataReceived._id }}>
                      <Avatar alt="" src={dataReceived.pic} />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText primary={dataReceived.name} />
                </MenuItem>
              </Menu>

             
              {/*  */}
            </div>
          )}
        </Search>

        <Icons>
          <Badge
            // badgeContent={1}
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

          <Badge
            // badgeContent={4}
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              navigate("/chat");
            }}
          >
            <Mail />
          </Badge>

          <Badge badgeContent={1} color="error">
            <Notifications />
          </Badge>
          <>
            {/* <Button
              id="basic-button"
              aria-controls={newopen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={newopen ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
              <Badge badgeContent={1} color="error">
                <Notifications color="error" />
              </Badge>
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={newopen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                {"No new messages"}
              </MenuItem>
            </Menu> */}
          </>
          

          <span>{userData?.name}</span>

          <Avatar
            sx={{ width: 30, height: 30, cursor: "pointer" }}
            alt="Remy Sharp"
            src={userData?.pic}
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
