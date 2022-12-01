import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  // CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
// import { Box } from "@mui/material";
import axios from "axios";
// import { useState } from "react";

function Post({ post }) {
  
  const like = async () => {
    console.log("like2 works");
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userId", userData._id);
    console.log("postId", post._id);
    console.log("likescount", post.likes.length);

    let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    if (!post.likes.length) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
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
          // setLikeStatus(true);
        });
    }

    if (post.likes.length) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
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
          // setLikeStatus(false);
        });
    }
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={post?.userId.pic}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
        <img
          style={{ "object-fit": "contain" }}
          width="800px"
          height="400px"
          src={post?.image}
          alt=""
        ></img>
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
        <IconButton aria-label="add to favorites">
          {post.likes.length ? (
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              // {likestatus?checkedIcon=<Favorite sx={{ color: "red" }} />:checkedIcon=<Favorite />}
              onClick={() => {
                like();
              }}
              defaultChecked
            />
          ) : (
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              // {likestatus?checkedIcon=<Favorite sx={{ color: "red" }} />:checkedIcon=<Favorite />}
              onClick={() => {
                like();
              }}
            />
          )}
        </IconButton>

        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
