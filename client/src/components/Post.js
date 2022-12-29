import React, { useEffect } from "react";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
// import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useState,useContext } from "react";
import Collapse from "@mui/material/Collapse";
import { format } from "timeago.js";
import { getUser } from "../api/UserRequest";
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/Context";

function Post({ post, setLiked }) {
  // const { setUniquePost } = useContext(UserContext)
  const navigate = useNavigate();

  // const userData = JSON.parse(localStorage.getItem("userInfo"));
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
    await axios
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
    await axios
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
    await axios
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
    await axios
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
    await axios
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
 
    await axios
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
    // console.log('connectuser working');
    // console.log('id',id);
    // console.log('userData._id',userData._id);
    await axios
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
    await axios
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
      await axios
      .post(
        "/notifylike",
        {
          likedUserId: likedUserId,
          postId: postId,
          postUserId: postUserId,
          likedUsername: likedUsername,
        },
        config
      )
      };

      const unlikeNotify = async (likedUserId,postId,postUserId) => {
        console.log("unlikeNotify working");
        await axios
        .post(
          "/notifyunlike",
          {
            likedUserId: likedUserId,
            postId: postId,
            postUserId: postUserId,
            // likedUsername: likedUsername,
          },
          config
        )
        };

        const commentNotify = async (commentedUserId,postId,postUserId,commentedUsername) => {
          await axios
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
            // console.log("uncommentNotify working");
            // console.log('commentedUserId',commentedUserId);
            // console.log('postId',postId);
            // console.log('postUserId',postUserId);

            await axios
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

     // axios requests end

// console.log('incoming post',post);
  return (
    // main card post start
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
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
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
      {/* <CardMedia
        component="img"
        // height="20%"
        width='800px' height='400px'
        style={{"object-fit":"contain"}}
        image={post?.image}
        alt="Paella dish"
      /> */}
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
              console.log('userId',userId);
              console.log('post._id',post._id);
              console.log('post.userId._id',post.userId._id);
              console.log('userData.name',userData.name);
              likeNotify(userId,post._id,post.userId._id,userData.name)
            }}
          >
            <FavoriteBorder />
          </IconButton>
        )}

        <IconButton
          aria-label="share"
          onClick={() => {
            setCommentAction(!commentaction);
          }}
        >
          <CommentIcon />
        </IconButton>

        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        
      </CardActions>

      <Collapse
        in={commentaction}
        timeout="auto"
        unmountOnExit
        sx={{ minHeight: "200px",
         maxHeight: "400px",
        //  scrollbar: {
        //   display: 'none'
        // },
          overflowY: "scroll" }}
      >
        {/* comment card start */}
        <Card sx={{ margin: 5 }}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={userData.pic}></Avatar>}
            title={userData.name}
            // subheader="September 14, 2022"
            // subheader={post?.date}
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
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem
                      onClick={() => {
                        console.log('allcomment._id',allcomment._id);
                        console.log('post.userId._id',post.userId._id);
                        console.log('post._id',post._id);
                        
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
    // main card post end
  );
}

export default Post;
