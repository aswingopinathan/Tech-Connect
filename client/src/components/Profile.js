import React from "react";
import {
  Avatar,
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ButtonGroup from "@mui/material/ButtonGroup";

function Profile({ userdata , setUserUpdate }) {
  console.log("userdata",userdata);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openprofile, setOpenProfile] = useState(false);
  const [close, setClose] = useState(false);
 
  const handleOpenProfile = () => setOpenProfile(true); 
  const handleCloseProfile = () => setOpenProfile(false);
  const handleClose = () => setClose(false);


  // const [openprofile, setOpenProfile] = useState(false);
  const [openabout, setOpenAbout] = useState(false);

  const [name, setName] = useState("");
  const [jobstatus, setJobStatus] = useState("");
  const [currentposition, setCurrentPosition] = useState("");
  const [place, setPlace] = useState("");

  const [about, setAbout] = useState("");

  // let pic = JSON.parse(localStorage.getItem("userInfo"))?.pic;
  // let username = JSON.parse(localStorage.getItem("userInfo"))?.name;

  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
  let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const handleProfile = async () => {
    console.log("editprofile working");
    await axios
      .post(
        "/editprofile",
        {
          userId: userId,
          name: name,
          jobstatus: jobstatus,
          currentposition: currentposition,
          place: place,
        },
        config
      )
      .then(() => {
        setOpenProfile(false)
        setUserUpdate(Math.random());
      });
      // console.log('editdata',data);
  };

  return (
    <div style={{ backgroundColor: "#f2ebeb" }}>
      {/* modal start */}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={openprofile}
          onClose={handleCloseProfile}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "end"}}>
            <Button onClick={handleCloseProfile}>
              <CloseIcon/>
            </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Profile
              </Typography>
            </div>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Name" variant="standard"
                fullWidth
                onChange={(e)=>setName(e.target.value)}>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Jobstatus" variant="standard"
                fullWidth
                onChange={(e)=>setJobStatus(e.target.value)}>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Currentposition" variant="standard"
                fullWidth
                onChange={(e)=>setCurrentPosition(e.target.value)}>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField id="standard-basic" label="Place" variant="standard"
                fullWidth
                onChange={(e)=>setPlace(e.target.value)}>
                </TextField>
              </Grid>
            </Grid>

            <div style={{ display: "flex", justifyContent: "end", paddingTop:'10px'}}>
            <Button 
            variant="contained"
            onClick={handleProfile}>
              save
            </Button>
            </div>

          </Box>
        </Modal>
      </div>

      {/* modal end */}

      <Box sx={{ marginLeft: "350px", paddingTop: "20px", width: "800px" }}>
        {/* <img
          style={{ width: "800px", height: "250px" }}
          src={images}
          alt=""
        ></img> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Avatar src={userdata.pic} sx={{ width: 160, height: 160 }} />
          </div>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "300px",
          bgcolor: "white",
        }}
        variant="outlined"
      >
        <div
          style={{
            marginTop: "40px",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* <h1>{username}</h1> */}
            <h1>{userdata.name}</h1>

          </div>
          <div>
            <Button sx={{ cursor: "pointer" }} onClick={handleOpenProfile}>
              <EditIcon />
            </Button>
          </div>
        </div>

        <div style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h3>{userdata.jobPosition}</h3>
        </div>

        <div style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h4>{userdata.place}</h4>
        </div>

        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <span>500 Connections</span>
        </div>

        {/* <div style={{ marginTop: "10px",marginLeft:'20px' }}>
          <Button variant="contained">Open to</Button>
          <Button variant="outlined" sx={{marginLeft:'20px'}}>Add Profile Section</Button>
          <Button variant="outlined" sx={{marginLeft:'20px',color:'grey'}}>More</Button>
        </div> */}

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              backgroundColor: "#E9E5DF",
              // marginLeft:'20px',
              marginTop: "20px",
              width: "350px",
              height: "80px",
            }}
          >
            <div style={{ margin: "10px" }}>
              <p>
                <strong>{userdata.jobStatus}</strong>
              </p>
              <p>Software Developer roles</p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#E9E5DF",
              // marginLeft:'20px',
              marginTop: "20px",
              width: "350px",
              height: "80px",
            }}
          >
            <div style={{ margin: "10px" }}>
              <p>
                <strong>Showcase services</strong> you offer so you and your
                business can be found in search.
              </p>
            </div>
          </div>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "100px",
          bgcolor: "white",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>About</h3>
            <p>
              I am self-taught MERN stack developer with experience in web
              designing and web development. More enthusiastic in backend
              development.
            </p>
          </div>
          <div>
            <Button
              sx={{ cursor: "pointer" }}
              onClick={() => {
                console.log("edit button clicked");
                setOpenAbout(true);
              }}
            >
              <EditIcon />
            </Button>
          </div>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "100px",
          bgcolor: "white",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Experience</h3>
            <ul>
              <li>MERN stack developer trainee</li>
              <li>Network Engineer</li>
            </ul>
          </div>
          <Button
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log("edit button clicked");
            }}
          >
            <EditIcon />
          </Button>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "100px",
          bgcolor: "white",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Education</h3>
            <ul>
              <li>B.TECH</li>
              <li>PG Diploma in Industrial Automation</li>
              <li>CCNA</li>
            </ul>
          </div>
          <Button
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log("edit button clicked");
            }}
          >
            <EditIcon />
          </Button>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "100px",
          bgcolor: "white",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Skills</h3>
            <ul>
              <li>MERN stack developer trainee</li>
              <li>MERN stack developer trainee</li>
              <li>MERN stack developer trainee</li>
            </ul>
          </div>
          <Button
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log("edit button clicked");
            }}
          >
            <EditIcon />
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Profile;
