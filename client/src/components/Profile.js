import React from "react";
import { Box, Button } from "@mui/material";
import images from "../images/lap.PNG";

function Profile() {
  return (
    <>
      <Box sx={{ marginLeft: "350px", width: "800px" }}>
        <img
          style={{ width: "800px", height: "250px" }}
          src={images}
          alt=""
        ></img>
      </Box>

      <Box
        sx={{
          marginLeft: "350px",
          width: "800px",
          height: "300px",
          bgcolor: "yellow",
        }}
      >
        <div style={{ marginTop: "80px",marginLeft:'20px' }}>
        <h1 >Aswin Gopinathan</h1>
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

        <div style={{ marginTop: "10px",marginLeft:'20px' }}>
          <Button variant="contained">Open to</Button>
          <Button variant="outlined" sx={{marginLeft:'20px'}}>Add Profile Section</Button>
          <Button variant="outlined" sx={{marginLeft:'20px',color:'grey'}}>More</Button>
        </div>

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
          height: "250px",
          bgcolor: "yellow",
        }}
      >
        <div style={{ marginTop: "50px" }}>
        <h4 >Aswin Gopinathan</h4>
        </div>
      </Box>
    </>
  );
}

export default Profile;
