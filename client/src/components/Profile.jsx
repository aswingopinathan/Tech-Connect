import React from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Grid from "@mui/material/Grid";
// import Loading from "./Loading";

function Profile({ userdata, setUserUpdate, mode, setMode }) {

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
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const [name, setName] = useState("");
  const [jobstatus, setJobStatus] = useState("");
  const [currentposition, setCurrentPosition] = useState("");
  const [place, setPlace] = useState("");

  const [openabout, setOpenAbout] = useState(false);
  const handleOpenAbout = () => setOpenAbout(true);
  const handleCloseAbout = () => setOpenAbout(false);

  const [about, setAbout] = useState("");

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
        setOpenProfile(false);
        setUserUpdate(Math.random());
      });
  };

  const handleAbout = async () => {
    console.log("handleAbout working");
    await axios
      .post(
        "/editabout",
        {
          userId: userId,
          about: about,
        },
        config
      )
      .then(() => { 
        console.log('editAbout successfull');
        setOpenAbout(false);
        setUserUpdate(Math.random());
      });
  };
// 
  const [picMessage, setPicMessage] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const imageUpload = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setLoading(true);

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
          setLoading(false);
          console.log("data.url.toString()", data.url.toString());
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  const submitPic = async () => {
    console.log("submitPic working");
    console.log("userId", userId);
    console.log("pic", pic);
    if (pic) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/picupdate",
          {
            pic: pic,
            userId: userId,
          },
          config
        );
        console.log(data);
        setLoading(false);
        setPic(null);
        setUserUpdate(Math.random());
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      console.log("No pic data");
    }
  };
//
  return (
    <Box>
      {/* modal1 start */}

      <Modal
        open={openprofile}
        onClose={handleCloseProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleCloseProfile}>
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
              Edit Profile
            </Typography>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Jobstatus"
                variant="standard"
                fullWidth
                onChange={(e) => setJobStatus(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Currentposition"
                variant="standard"
                fullWidth
                onChange={(e) => setCurrentPosition(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Place"
                variant="standard"
                fullWidth
                onChange={(e) => setPlace(e.target.value)}
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
            <Button variant="contained" onClick={handleProfile}>
              save
            </Button>
          </div>
        </Box>
      </Modal>
      {/* modal1 end */}

      {/* modal2 start */}
      <Modal
        open={openabout}
        onClose={handleCloseAbout}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleCloseAbout}>
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
              Edit About
            </Typography>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="About"
                variant="standard"
                multiline
                fullWidth
                onChange={(e) => setAbout(e.target.value)}
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
            <Button variant="contained" onClick={handleAbout}>
              save
            </Button>
          </div>
        </Box>
      </Modal>
      {/* modal2 end */}

      <Box sx={{ marginLeft: "350px", paddingTop: "20px", width: "800px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Button component="label">
              <Avatar
                src={userdata.pic}
                sx={{ width: 160, height: 160, cursor: "pointer" }}
              />
              <input
                type="file"
                onChange={(e) => {
                  imageUpload(e.target.files[0]);
                }}
                hidden
              />
            </Button>
            {pic ? <Button onClick={submitPic}>submit</Button> : ""}
          </div>
        </div>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "300px",
          bgcolor: "background.default",
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
          <Box>
            {/* <h1>{username}</h1> */}
            <h1>{userdata.name}</h1>
          </Box>
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
              backgroundColor: "background.default",
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
              backgroundColor: "background.default",
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
          bgcolor: "background.default",
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
            <p>{userdata.about} </p>
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
          bgcolor: "background.default",
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
          bgcolor: "background.default",
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
          bgcolor: "background.default",
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
    </Box>
  );
}

export default Profile;
