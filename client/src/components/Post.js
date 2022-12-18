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
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { format } from "timeago.js";
import { getUser } from "../api/UserRequest";

function Post({ post, setLiked }) {
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
      .then(() => {
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

  const removecomment = async (id) => {
    await axios
      .post(
        "/removecomment",
        {
          userId: userData._id,
          postId: post._id,
          commentId: id,
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
  // axios requests end

  // console.log("checking",userData.connectionIds?.includes(post.userId._id));
  // console.log('checking',post.userId._id);
  // console.log('checking userData.connectionIds',userData.connectionIds);

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
        avatar={<Avatar aria-label="recipe" src={post?.userId.pic}></Avatar>}
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
        ""
      )}

      {post.video ? (
        <video
          controls
          style={{ objectFit: "contain" }}
          width="800px"
          height="400px"
          src={post?.video}
          alt=""
        ></video>
      ) : (
        ""
      )}

      <CardActions disableSpacing>
        {post.likes.length ? <span>{post.likes.length}</span> : ""}

        {/* like checking scenario */}
        {post.likes.includes(userId) ? (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              unlike();
            }}
          >
            <Favorite sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              like();
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

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Collapse
        in={commentaction}
        timeout="auto"
        unmountOnExit
        sx={{ minHeight: "200px", maxheight: "500px", overflowY: "scroll" }}
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
                        // removecomment(allcomment._id)
                        console.log(allcomment._id);
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
