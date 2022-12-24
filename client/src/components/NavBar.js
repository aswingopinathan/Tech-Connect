import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { findNotify, getUser } from "../api/UserRequest";
import { UserContext } from "../context/Context";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

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
  
  const { updateNav, setUniquePost } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
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
      if(queryinput){
        let { data } = await axios.get(`/search/${queryinput}`, config);
      // console.log("data",data);
        [data] = data;


      setDataReceived(data);
      if (queryinput.length > 4) {
        setAnchorE2(true);
      } else {
        setAnchorE2(false);
      }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users) => {
      // setOnlineUsers(users)
      // console.log('onlineUsers',onlineUsers);
      // console.log("for socket to work");
    });
  }, [userId]);

  const [notify,setNotify] = useState("");
  const [myNotify,setMyNotify] = useState([])
  const [updateNotify,setUpdateNotify] = useState(false)

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await findNotify(userId);
        // console.log('notify',data);
        // console.log('data.notifications',data.notifications);
        // console.log('data.notifications',data.notifications);


        setNotify(data);
        setMyNotify(data.notifications)
      } catch (error) { 
        console.log(error);
      }
    };
    getNotifications();
  }, [updateNotify]);
// console.log('notify.notifications.length',notify?.notifications?.length);

  const clearNotification = async()=>{
    await axios.post('/clearnotify',{
      userId: userId,
    },config).then(()=>{
      setUpdateNotify(!updateNotify)
    setAnchorEl(null);

    })
  }
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
           <div>
             <InputBase
              placeholder="search... "
              sx={{ bgcolor: "black", width: "100%", paddingLeft: "10px" }}
              onChange={(e) => {
                searching(e.target.value);
                /////////
              }}
            />
            <Menu
                id="basic-menu"
                // anchorE2={anchorE2}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 60, left: 530 }}
                open={newopen1}
                onClose={handleClose1}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                sx={{width:"400px"}}
                > 
                  <ListItemAvatar>
                    <Link
                      to="/viewprofile"
                      state={{ userId: dataReceived._id }}
                    >
                      <Avatar alt="" src={dataReceived.pic} />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText primary={dataReceived.name} />
                </MenuItem>
              </Menu>
           </div>
          ) : (
            <div>
              <InputBase
                placeholder="search... "
                sx={{
                  paddingLeft: "10px",
                  width: "100%",
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
                // anchorE2={anchorE2}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 60, left: 530 }}
                open={newopen1}
                onClose={handleClose1}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                sx={{width:"400px"}}
                > 
                  <ListItemAvatar>
                    <Link
                      to="/viewprofile"
                      state={{ userId: dataReceived._id }}
                    >
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
              setUniquePost(false) 
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

          <Badge badgeContent={notify?.notifications?.length} color="error"
           sx={{ cursor: "pointer" }}
           onClick={() => {
            console.log('notification clicked');
            // handleClick()
            // setAnchorE1(true)
            setAnchorEl(true)
           }}
           >
            <Notifications />
          </Badge>
          <>
            {(notify?.notifications?.length > 0) ?(<Menu
            id="basic-menu"
            // anchorE2={anchorE2}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 60, left: 1200 }}
            open={newopen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            >
            {myNotify?.map((nmessages)=>(
                <MenuItem
                sx={{width:"300px"}}
                onClick={()=>{
                  // console.log('nmessages.commentedpostid',nmessages.commentedpostid);
                  // console.log('nmessages.likedpostid',nmessages.likedpostid);

                  setUniquePost(nmessages.likedpostid || nmessages.commentedpostid)
                   setAnchorEl(null);

                }}
                > 
                    <ListItemText primary={nmessages.message} />
                </MenuItem>
                  ))}
                <MenuItem
                sx={{width:"300px"}}
                > 
                  {/* <ListItemText primary={dataReceived.name} /> */}
                  <Button
                  variant="contained"
                  onClick={()=>{
                    clearNotification()
                  }}
                  >Mark as read</Button>
                </MenuItem>
                  
              </Menu>):(<Menu
            id="basic-menu"
            // anchorE2={anchorE2}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 60, left: 1200 }}
            open={newopen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            >
                <MenuItem
                sx={{width:"300px"}}
                > 
                    <ListItemText primary="No notification" />
                </MenuItem>
                
              </Menu>)}
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
