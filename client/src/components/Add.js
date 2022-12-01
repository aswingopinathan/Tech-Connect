import {
  Avatar,
  Fab,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

import { Stack } from "@mui/system";
import ImageIcon from "@mui/icons-material/Image";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';

const StyleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});
function Add() {
  const [open, setOpen] = useState(false);
  let imageUrl = JSON.parse(localStorage.getItem("userInfo"))?.pic;
  let userName = JSON.parse(localStorage.getItem("userInfo"))?.name;

  const [picMessage, setPicMessage] = useState();
  const [pic, setPic] = useState();
  const [videoMessage, setVideoMessage] = useState();
  const [video, setVideo] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageUpload = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "techconnect");
      data.append("cloud_name", process.env.CLOUD_NAME);
      fetch(`https://api.cloudinary.com/v1_1/dtsqr3v76/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setImgUpload(true)
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  
  const videoUpload = (vid) => {
    if (!vid) {
      return setVideoMessage("Please select an image");
    }
    setVideoMessage(null);

    if (vid.type === "video/mp4" || vid.type === "video/mov") {
      const data = new FormData();
      data.append("file", vid);
      data.append("upload_preset", "techconnect");
      data.append("cloud_name", process.env.CLOUD_NAME);
      fetch(`https://api.cloudinary.com/v1_1/dtsqr3v76/video/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setImgUpload(true)
          setVideo(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setVideoMessage("Please select a video");
    }
  };

  const handleSubmit = async()=>{
    console.log('post working');
    if(pic || video){
      // console.log('pic or video detected');
      // let token = localStorage.getItem("userInfo").token
  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      try{
        const config = {
          headers: {
            "Content-Type": "application/json",
            token :`Bearer ${token}`
          },
        };

        setLoading(true);
  let name = JSON.parse(localStorage.getItem("userInfo"))?.name;
  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

          const { data } = await axios.post(
            "/addpost",
            { description: description, pic: pic, video:video,name:name,userId:userId },
            config
          );

          console.log(data);

          setLoading(false);
          setError("");
          
          // navigate("/user");
          setPic(null)
          setOpen(false)

      }catch(error){
        setError(error.response.data.message);
          setLoading(false);
      }
    }else{
      console.log('description');

    }
  }

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      <StyleModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          width={300}
          minHeight={280}
          p={3}
          borderRadius={5}
        >
          <Typography
            variant="h6"
            color={"grey"}
            textAlign="center"
            sx={{ color: "black" }}
          >
            Create post
          </Typography>
          <UserBox>
            <Avatar src={imageUrl} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              {userName}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="what's on your mind?"
            variant="standard"
            onChange={(e=>{setDescription(e.target.value)})}
          />

        {pic?<div style={{ display: 'flex' }}>
        <Collapse in={pic}>
          <Paper
            elevation={5}
            style={{ margin: 5 }} >
              
            <img src={pic} alt="" style={{ width: 300, height: 200 }}>
              
            </img>
          </Paper>
        </Collapse>
      </div> : ""}

      {video?<div style={{ display: 'flex' }}>
        <Collapse in={video}>
          <Paper
            elevation={5}
            style={{ margin: 5 }} >
              
            <video src={video} alt="" style={{ width: 300, height: 200 }}>
              
            </video>
          </Paper>
        </Collapse>
      </div> : ""}
          
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <Button component="label">
              <ImageIcon color="secondary" />
              <input
                type="file"
                onChange={(e) => imageUpload(e.target.files[0])}
                hidden
              />
            </Button>

            <Button component="label">
              <VideoCameraBackIcon color="success" />
              <input
                type="file"
                onChange={(e) => videoUpload(e.target.files[0])}
                hidden
              />
            </Button>
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
            onClick={handleSubmit}
            >Post</Button>
           
          </ButtonGroup>
        </Box>
      </StyleModal>
    </>
  );
}

export default Add;
