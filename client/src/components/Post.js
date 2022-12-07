import React from "react";
import {
  Avatar,
  Card,
  // Box,
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

function Post({ post, setLiked }) {
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

  // console.log('postchecking',post.comments);

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
  // const [reported,setReported] = useState(false)

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

  const removecomment = async () => {
    await axios
      .post(
        "/removecomment",
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
  // axios requests end

  return (
    // main card post start
    <Card
      sx={{
        margin: 2,
        borderRadius: "2em",
        minWidth: "auto",
        maxWidth: "800px",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={post?.userId.pic}></Avatar>}
        action={
          <>
            <Button
              onClick={() => {
                console.log("connect working");
              }}
            >
              + Connect
            </Button>
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
        subheader={post?.date}
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
          sx={{ "object-fit": "contain" }}
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
          style={{ "object-fit": "contain" }}
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
        sx={{ minHeight: "200px", maxHeight: "500px", overflowY: "scroll" }}
      >
        {/* comment card start */}
        <Card sx={{ margin: 5 }}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={userData.pic}></Avatar>}
            title={userData.name}
            // subheader="September 14, 2022"
            // subheader={post?.date}
            minHeight="40px"
            maxHeight="80px"
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
                setComment(e.target.value);
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
        {post.comments.map((allcomment) => (
          <Card sx={{ margin: 5 }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" src={allcomment.pic}></Avatar>
              }
              action={
                <IconButton aria-label="settings">
              {allcomment.userId===userId?<MoreVertIcon onClick={handleClick} />:""}
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
                    <MenuItem onClick={removecomment}>Delete</MenuItem>
              </Menu>
            </IconButton>
              }
              title={allcomment.name}
              // subheader="September 14, 2022"
              // subheader={post?.date}
              minHeight="40px"
              maxHeight="80px"
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
