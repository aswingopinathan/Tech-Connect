import { Box, Button, ListItemText, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
// import AvatarGroup from "@mui/material/AvatarGroup";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { getAllUsers } from "../api/UserRequest";
import axios from "axios";
// import { UserContext } from "../context/Context";
// import MessageIcon from "@mui/icons-material/Message";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { UserContext } from "../context/Context";
import { findChat } from "../api/ChatRequest";
// import { Stack } from "@mui/system";

function RightBar() {
  const { setChatLoader } = useContext(UserContext)
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [connectUpdate, setConnectUpdate] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

    const allUsers = async (userId) => {
      try {
        let { data } = await getAllUsers(userId);
        // console.log("rightbar incoming data", data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    allUsers(userId);
  }, [connectUpdate]);

  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

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
        setConnectUpdate(Math.random());
      });
  };

  const chatCreator = async (id) => {
    await axios.post(
      "/chat",
      {
        senderId: userId,
        receiverId: id,
      },
      config
    );
  };

  // const redirectToChat = () => {
  //   setChatLoader(Math.random())
  //   navigate("/chat");
  // };

  return (
    <>
      <Box
        flex={2}
        pl={2}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          // backgroundColor: "yellow",
        }}
      >
        <Box position="fixed" width={300} paddingTop="1rem" pl={5}>
          <Typography variant="h6" fontWeight={100} mt={1}>
            People you may know
          </Typography>
          

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              borderRadius: "2rem",
              marginTop: "1rem",
            }}
          >
            {users.map((usersall, index) => ( 
              <div key={index}>
                {usersall.connectionIds.includes(userId)?(<></>):(<><ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {usersall._id === userId?(
                    <Link to='/profile'><Avatar alt="" src={usersall.pic} /></Link>):(
                      <Link to='/viewprofile' state={{ userId: usersall._id}}><Avatar alt="" src={usersall.pic} /></Link>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={usersall.name}
                    secondary={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          {usersall.connectionIds.includes(userId) ? (
                            <Button
                              onClick={() => {
                                // redirectToChat();
                               
                              }}
                            >
                              <EmailIcon />
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div>
                          {usersall.connectionIds.includes(userId) ? (
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Connected
                            </Typography>
                          ) : (
                            <Typography
                              sx={{ display: "inline", cursor: "pointer" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              onClick={() => {
                                connectUser(usersall._id);
                                chatCreator(usersall._id);
                              }}
                            >
                              +Connect
                            </Typography>
                          )}
                        </div>
                      </div>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" sx={{ width: "70%" }} /></>)}
                
              </div>
            ))}
          </List>

          <Typography variant="h6" fontWeight={100} mt={10}>
            My Connections
          </Typography>

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              borderRadius: "2rem",
              marginTop: "1rem",
            }}
          >
            {users.map((usersall, index) => (
              <div key={index}>
                {usersall.connectionIds.includes(userId)?(<><ListItem alignItems="flex-start">
                  <ListItemAvatar>
                  {usersall._id === userId?(
                    <Link to='/profile'><Avatar alt="" src={usersall.pic} /></Link>):(
                      <Link to='/viewprofile' state={{ userId: usersall._id}}><Avatar alt="" src={usersall.pic} /></Link>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={usersall.name}
                    secondary={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          {usersall.connectionIds.includes(userId) ? (
                            <Button
                              onClick={() => {
                                // redirectToChat();
                                findChat(userId,usersall._id).then((data)=>{
                                  // console.log("chat",data.data);
                                  navigate('/chat',{ state : {chat : data.data}})
                                })
                              }}
                            >
                              <EmailIcon />
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div>
                          {usersall.connectionIds.includes(userId) ? (
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Connected
                            </Typography>
                          ) : (
                            <Typography
                              sx={{ display: "inline", cursor: "pointer" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              onClick={() => {
                                connectUser(usersall._id);
                                chatCreator(usersall._id);
                              }}
                            >
                              +Connect
                            </Typography>
                          )}
                        </div>
                      </div>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" sx={{ width: "70%" }} /></>):(<></>)}
                
              </div>
            ))}
          </List>

        </Box>
      </Box>
    </>
  );
}

export default RightBar;
