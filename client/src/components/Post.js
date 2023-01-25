import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { format } from "timeago.js";
import { getUser } from "../api/UserRequest";
import { Link, useNavigate } from "react-router-dom";
// 
import CloseIcon from "@mui/icons-material/Close";
import {io} from 'socket.io-client'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
// 
function Post({ post, setLiked }) {
  const axioInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  // 
  const socket = useRef()
// 
  // 
  const [editpost,setEditPost] = useState("")
  const [openpost, setOpenPost] = React.useState(false);
  const [postId,setPostId] = useState('')
  const handleOpenPost = (postId) => {
    setOpenPost(true)
    setPostId(postId)
  };
  const handleClosePost = () => setOpenPost(false);
  // 
  const navigate = useNavigate();

  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  var userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  const [userData, setUserData] = useState("");
  

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
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [commentaction, setCommentAction] = useState(false);
  const [comment, setComment] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  // axios requests start
  const like = async () => {
    await axioInstance
      .post(
        "/like",
        {
          userId: userData._id,
          postId: post._id,
        },
        config
      )
      .then(async() => {
        setLiked(Math.random());
       
      });
  };

  const unlike = async () => {
    await axioInstance
      .post(
        "/unlike",
        {
          userId: userData._id,
          postId: post._id,
        },
        config
      )
      .then(() => {
        setLiked(Math.random());
      });
  };

  const addComment = async () => {
    console.log("addComment working");
    console.log(comment);
    await axioInstance
      .post(
        "/addcomment",
        {
          userId: userData._id,
          postId: post._id,
          comment: comment,
          name: userData.name,
          pic: userData.pic,
        },
        config
      )
      .then(() => {
        setLiked(Math.random());
        setComment("");
      });
  };

  const removepost = async () => {
    await axioInstance
      .post(
        "/removepost",
        {
          postId: post._id,
        },
        config
      )
      .then(() => {
        setLiked(Math.random());
        // handleClick();
        setAnchorEl(!anchorEl);
      });
  };

  const reportpost = async () => {
    await axioInstance
      .post(
        "/reportpost",
        {
          userId: userData._id,
          postId: post._id,
        },
        config
      )
      .then(() => {
        setLiked(Math.random());
        console.log("report post success");
      });
  };

  const removecomment = async (postCommentId,postId) => {
    console.log('userId',userId);
    console.log('postId',postId);
    console.log('commentId',postCommentId);
 
    await axioInstance
      .post(
        "/removecomment",
        {
          userId: userId,
          postId: postId,
          commentId: postCommentId,
        },
        config
      )
      .then(() => {
        setLiked(Math.random());
        setAnchorEl(!anchorEl);
      });
  };

  const connectUser = async (id) => {
   
    await axioInstance
      .post(
        "/connectuser",
        {
          userId: userData._id,
          connectUserId: id,
        },
        config
      )
      .then(() => {
        setLiked(Math.random());
      });
  };
 

  
  const chatCreator = async (id) => {
    await axioInstance
    .post(
      "/chat",
      {
        senderId: userId,
        receiverId: id,
      },
      config
    )
    };

    const likeNotify = async (likedUserId,postId,postUserId,likedUsername) => {
      await axioInstance
      .post(
        "/notifylike",
        {
          likedUserId: likedUserId,
          postId: postId,
          postUserId: postUserId,
          likedUsername: likedUsername,
        },
        config
      ).then(()=>{
        let socketData = {
          name: userData.name,
          pic: userData.pic,
          action: "liked",
          time: Date.now(),
          postOwnerId: postUserId,
        }
         socket.current = io("http://localhost:8800");
        socket.current.emit("send-notifications", socketData)
      })
      };

      const unlikeNotify = async (likedUserId,postId,postUserId) => {
        console.log("unlikeNotify working");
        await axioInstance
        .post(
          "/notifyunlike",
          {
            likedUserId: likedUserId,
            postId: postId,
            postUserId: postUserId,
          },
          config
        )
        };

        const commentNotify = async (commentedUserId,postId,postUserId,commentedUsername) => {
          await axioInstance
          .post(
            "/notifycomment",
            {
              commentedUserId: commentedUserId,
              postId: postId,
              postUserId: postUserId,
              commentedUsername: commentedUsername,
            },
            config
          )
          };

          const uncommentNotify = async (commentedUserId,postUserId,postId) => {
            await axioInstance
            .post(
              "/notifyuncomment",
              {
                commentedUserId: commentedUserId,
                postId: postId,
                postUserId: postUserId,
              },
              config
            )
            };

     // axioInstance requests end

// 
const handlePost = async () => {
  console.log("handlePost working");
  await axioInstance
    .post(
      "/editpost",
      {
        postId: postId,
        editpost: editpost,
      },
      config
    )
    .then(() => { 
      console.log('editPost successfull');
      setOpenPost(false);
      setLiked(Math.random());
    }).catch(()=>navigate('/page404'))
    // .catch(()=>navigate('/error'))
};
// 
  return (

    // main card post start
    <>
    {/*  */}
    <Modal
        open={openpost}
        onClose={handleClosePost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleClosePost}>
              <CloseIcon />
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"text.primary"}
            >
              Edit Post
            </Typography>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic" 
                label="Description"
                variant="standard"
                value={editpost}
                // value={post?.description}

  // about=userdata.about
                multiline
                fullWidth
                required
                onChange={(e) => setEditPost(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingTop: "10px",
            }}
            >
            <Button variant="contained" onClick={handlePost}>
              save
            </Button>
          </div>
        </Box>
      </Modal>
      {/*  */}
    <Card
      sx={{
        margin: 2,
        borderRadius: "2em",
        minWidth: "auto",
        maxWidth: "700px",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={post.userId._id === userId?(<Avatar
           aria-label="recipe"
            src={post?.userId.pic}
            sx={{cursor:"pointer"}}
            onClick={()=>{
              console.log('sameuser');
              navigate('/profile')
            }}
            ></Avatar>):(<Link to='/viewprofile' state={{ userId: post.userId._id}}>

            <Avatar aria-label="recipe" src={post?.userId.pic}></Avatar>
            </Link>
            )}
        action={
          <>
            {post.userId._id === userId ||
            userData.connectionIds?.includes(post.userId._id) ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  // console.log("connect working");
                  connectUser(post.userId._id);
                  chatCreator(post.userId._id)
                }}
              >
                + Connect
              </Button>
            )}
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleClick} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
               
              >
                {userId === post.userId._id ? (
                  <div>
                    <MenuItem 
                    // onClick={handleClose}
                    onClick={()=>{handleOpenPost(post._id)
                      handleClose()}}
                    >Edit</MenuItem>
                    <MenuItem onClick={removepost}>Delete</MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={reportpost}>
                    {post.report.includes(userId) ? "Reported" : "Report"}
                  </MenuItem>
                )}
              </Menu>
            </IconButton>
          </>
        }
        title={post?.userId.name}
        // subheader="September 14, 2022"
        subheader={format(post?.date)}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.description}
        </Typography>
      </CardContent>
     
      {post.image ? (
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          width="800px"
          height="400px"
          src={post?.image}
          alt=""
        ></CardMedia>
      ) : (
        <CardMedia
        component="video"

          controls
          style={{ objectFit: "contain" }}
          width="800px"
          height="400px"
          src={post?.video}
          alt=""
        ></CardMedia>
      )}

     
      <CardActions disableSpacing>
        {post.likes.length ? <span>{post.likes.length}</span> : ""}

        {/* like checking scenario */}
        {post.likes.includes(userId) ? (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              unlike();
              unlikeNotify(userId,post._id,post.userId._id)
            }}
          >
            <Favorite sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              like();
              likeNotify(userId,post._id,post.userId._id,userData.name)
            }}
          >
            <FavoriteBorder />
          </IconButton>
        )}
        {post.comments.length ? <span>{post.comments.length}</span> : ""}

        <IconButton
          aria-label="share"
          onClick={() => {
            setCommentAction(!commentaction);
          }}
        >
          <CommentIcon />
        </IconButton>

        
      </CardActions>

      <Collapse
        in={commentaction}
        timeout="auto"
        unmountOnExit
        sx={{ minHeight: "200px",
         maxHeight: "400px",
          overflowY: "scroll" }}
      >
        {/* comment card start */}
        <Card sx={{ margin: 5 }}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={userData.pic}></Avatar>}
            title={userData.name}
            
            minheight="40px"
            maxheight="80px"
          />
          <CardContent>
            <TextField
              sx={{ width: "100%", borderradius: "20px" }}
              id="standard-multiline-static"
              multiline
              // rows={3}
              placeholder="Add a comment...."
              variant="outlined"
              onChange={(e) => {
                if (e.target.value.match(/^[A-Za-z]+$/)) {
                  setComment(e.target.value);
                } else {
                  setComment("");
                }
              }}
            />
            {comment ? (
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                  addComment();
                  commentNotify(userId,post._id,post.userId._id,userData.name)
                }}
              >
                Post
              </Button>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
        {/* comment card end */}

        {/* db card start*/}
        {post.comments.map((allcomment, index) => (
          <Card sx={{ margin: 5 }} key={index}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" src={allcomment.pic}></Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  {allcomment.userId === userId ? (
                    <MoreVertIcon onClick={handleClick} />
                  ) : (
                    ""
                  )}
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {/* <MenuItem onClick={handleClose}>Edit</MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        removecomment(allcomment._id,post._id)
                        uncommentNotify(userId,post.userId._id,post._id)

                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </IconButton>
              }
              title={allcomment.name}
              // subheader="September 14, 2022"
              subheader={format(allcomment.date)}
              minheight="40px"
              maxheight="80px"
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {allcomment.comment}
              </Typography>
            </CardContent>
          </Card>
        ))}
        {/* db card end */}
      </Collapse>
    </Card>
    </>
    // main card post end

    
  );
}

export default Post;
