import React from "react";
import { Avatar,Box, Button,styled,TextField,Typography } from "@mui/material";
// import images from "../images/lap.PNG";
import EditIcon from '@mui/icons-material/Edit';
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Stack } from "@mui/system";
// import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from '@mui/icons-material/Close';

function Profile() {

  const StyleModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const [openprofile, setOpenProfile] = useState(false);
  const [openabout, setOpenAbout] = useState(false);


  let pic = JSON.parse(localStorage.getItem("userInfo"))?.pic;
  let username = JSON.parse(localStorage.getItem("userInfo"))?.name;


  return (
    <div style={{backgroundColor:'#f2ebeb'}}>
      {/* modal start */}
    <StyleModal
        open={openprofile}
        onClose={(e) => setOpenProfile(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          width={600}
          minHeight={280}
          p={3}
          borderRadius={5}
        >
          <div style={{display:'flex',justifyContent:'end'}}>
          <CloseIcon
          sx={{cursor:'pointer'}}
          onClick={()=>{setOpenProfile(false)}}/>
          </div>
          <Typography
            variant="h6"
            color={"grey"}
            textAlign="center"
            sx={{ color: "black" }}
          >
            Edit Profile
          </Typography>
          
          {/* <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="what's on your mind?"
            variant="standard"
            onChange={(e=>{setDescription(e.target.value)})}
          /> */}
          

          <Stack  gap={2} mt={2} mb={3}>
          <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth/>
          <TextField id="outlined-basic" label="Current Position" variant="outlined" fullWidth/>
          <TextField id="outlined-basic" label="Place" variant="outlined" fullWidth/>
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth/> */}
          </Stack>

          <div style={{display:'flex',justifyContent:'end'}}>
          <Button
            variant="contained"
            // fullWidth
            // onClick={handleSubmit}
            >Save</Button>
          </div>

        </Box>
      </StyleModal>

      <StyleModal
        open={openabout}
        onClose={(e) => setOpenAbout(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          width={600}
          minHeight={180}
          p={3}
          borderRadius={5}
        >
          <div style={{display:'flex',justifyContent:'end'}}>
          <CloseIcon
          sx={{cursor:'pointer'}}
          onClick={()=>{setOpenAbout(false)}}/>
          </div>
          <Typography
            variant="h6"
            color={"grey"}
            textAlign="center"
            sx={{ color: "black" }}
          >
            Edit About
          </Typography>
          
          {/* <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="what's on your mind?"
            variant="standard"
            onChange={(e=>{setDescription(e.target.value)})}
          /> */}
          

          <Stack  gap={2} mt={2} mb={3}>
          <TextField id="standard-multiline-static"
          //  label="You can write about your years of experience, industry, or skills."
           variant="standard"
            fullWidth
            multiline
            placeholder="You can write about your years of experience, industry, or skills."
            rows={3}/>
          
          </Stack>

          <div style={{display:'flex',justifyContent:'end'}}>
          <Button
            variant="contained"
            // fullWidth
            // onClick={handleSubmit}
            >Save</Button>
          </div>
          
        </Box>
      </StyleModal>
      {/* modal end */}









      <Box sx={{ marginLeft: "350px",paddingTop:'20px', width: "800px" }} >
        {/* <img
          style={{ width: "800px", height: "250px" }}
          src={images}
          alt=""
        ></img> */}
        <div style={{display:'flex',justifyContent:'center'}}>
        <div>
        <Avatar
         src={pic}
         sx={{ width: 160, height: 160 }}/>
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
        variant='outlined'
      >
        <div style={{ marginTop: "40px",marginLeft:'20px',display:'flex',justifyContent:'space-between' }}>
        <div><h1 >{username}</h1></div>
        <div>
          <Button sx={{cursor:'pointer'}}
           onClick={()=>{console.log('edit button clicked')
           setOpenProfile(true)}}>
          <EditIcon/>
          </Button>
          </div>
        </div>

        <div style={{ marginTop: "10px",marginLeft:'20px' }}>
        <h3>MERN Stack Developer</h3>
        </div>

        <div style={{ marginTop: "10px",marginLeft:'20px' }}>
        <h4>Kerala, India</h4>
        </div>

        <div style={{ marginTop: "20px",marginLeft:'20px' }}>
        <span>500 Connections</span>
        </div>

        {/* <div style={{ marginTop: "10px",marginLeft:'20px' }}>
          <Button variant="contained">Open to</Button>
          <Button variant="outlined" sx={{marginLeft:'20px'}}>Add Profile Section</Button>
          <Button variant="outlined" sx={{marginLeft:'20px',color:'grey'}}>More</Button>
        </div> */}

        <div style={{display:'flex',justifyContent:'space-around'}}>

        <div style={{backgroundColor:'#E9E5DF',
        // marginLeft:'20px',
        marginTop:'20px',
        width:'350px',
        height:'80px'
        }}>
          <div style={{margin:'10px'}}>
          <p><strong>Open to work</strong></p>
        <p>Software Developer roles</p>
          </div>
        
        </div>
        <div style={{backgroundColor:'#E9E5DF',
        // marginLeft:'20px',
        marginTop:'20px',
        width:'350px',
        height:'80px'
        }}>
          <div style={{margin:'10px'}}>
        <p><strong>Showcase services</strong> you offer
           so you and your business can
            be found in search.</p>
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
        <div style={{ marginTop: "20px",marginLeft:'20px',display:'flex',justifyContent:'space-between' }}>
          <div>
          <h3>About</h3>
          <p>I am self-taught MERN stack developer with experience
             in web designing and web development.
              More enthusiastic in backend development.</p>
          </div>
              <div>
                <Button sx={{cursor:'pointer'}}
                onClick={()=>{console.log('edit button clicked')
                setOpenAbout(true)}}
                ><EditIcon/></Button>
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
        <div style={{ marginTop: "20px",marginLeft:'20px',display:'flex',justifyContent:'space-between' }}>
          <div>
          <h3>Experience</h3>
          <ul>
            <li>MERN stack developer trainee</li>
            <li>Network Engineer</li>
          </ul>
          </div>
          <Button sx={{cursor:'pointer'}}
          onClick={()=>{console.log('edit button clicked')}}
          ><EditIcon/></Button>
          
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
        <div style={{ marginTop: "20px",marginLeft:'20px',display:'flex',justifyContent:'space-between' }}>
          <div>
          <h3>Education</h3>
          <ul>
            <li>B.TECH</li>
            <li>PG Diploma in Industrial Automation</li>
            <li>CCNA</li>
          </ul>
          </div>
          <Button sx={{cursor:'pointer'}}
          onClick={()=>{console.log('edit button clicked')}}
          ><EditIcon/></Button>
          
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
        <div style={{ marginTop: "20px",marginLeft:'20px',display:'flex',justifyContent:'space-between' }}>
          <div>
          <h3>Skills</h3>
          <ul>
            <li>MERN stack developer trainee</li>
            <li>MERN stack developer trainee</li>
            <li>MERN stack developer trainee</li>
          </ul>
          </div>
          <Button sx={{cursor:'pointer'}}
          onClick={()=>{console.log('edit button clicked')}}
          ><EditIcon/></Button>
          
        </div>
      </Box>

    </div>
  );
}

export default Profile;
