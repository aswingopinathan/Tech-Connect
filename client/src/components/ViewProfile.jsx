import React from "react";
import {
  Avatar,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { findChat } from "../api/ChatRequest";
// import { findChat } from "../../../server/controllers/ChatController";


function ViewProfile({ userdata, mode, setMode, setConnectUpdate }) {
  const navigate = useNavigate();

  let userId = JSON.parse(localStorage.getItem("userInfo"))?._id;
// console.log('userId',userId);
// console.log('userdata.connectionIds',userdata.connectionIds);
let token = JSON.parse(localStorage.getItem("userInfo"))?.token;
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

const connectUser = async (id) => {
  await axios
    .post(
      "/connectuser",
      {
        userId: userId,
        connectUserId: id,
      },
      config
    )
    .then(() => {
      setConnectUpdate(Math.random());
    });
};

const disConnectUser = async (id) => {
  await axios
    .post(
      "/disconnectuser",
      {
        userId: userId,
        disConnectUserId: id,
      },
      config
    )
    .then(() => {
      setConnectUpdate(Math.random());
    });
};

const chatCreator = async (id) => {
  await axios.post(
    "/chat",
    {
      senderId: userId,
      receiverId: id,
    },
    config
  );
};

const chatRemover = async (id) => {
  await axios.post(
    "/chat/removechat",
    {
      senderId: userId,
      receiverId: id,
    },
    config
  );
};

  return (
    <Box>
      

      <Box sx={{ marginLeft: "350px", paddingTop: "20px", width: "800px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
          <Avatar
                src={userdata.pic}
                sx={{ width: 160, height: 160 }}
              />
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
          <div style={{
            margin:"20px"
          }}>
            <h1>{userdata?.name}</h1>
          </div>

          <div style={{
            margin:"20px"
          }}>
            {userdata.connectionIds && userdata.connectionIds.includes(userId)?(<>
              <Button 
              sx={{marginRight:"10px"}}
            variant='contained'
            onClick={()=>{
              findChat(userId,userdata._id).then((data)=>{
                console.log("chat",data.data);
                navigate('/chat',{ state : {chat : data.data}})
              })
            }}
            >Message</Button>
            <Button 
            // variant='contained'
            variant="outlined" color="error"
            onClick={()=>{
              disConnectUser(userdata._id)
              chatRemover(userdata._id)
            }}
            >-Disconnect</Button></>):(<Button 
            variant='contained'
            onClick={()=>{
              connectUser(userdata._id)
              chatCreator(userdata._id)

            }}
            >+Connect</Button>)}
            
          </div>
            
        </div>

        <div style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h3>{userdata?.jobPosition}</h3>
        </div>

        <div style={{ marginTop: "10px", marginLeft: "20px" }}>
          <h4>{userdata?.place}</h4>
        </div>

        <div style={{ marginTop: "20px", marginLeft: "20px" }} >
          <span>{userdata && userdata?.connectionIds.length} connections</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              backgroundColor: "background.default",
              marginTop: "20px",
              width: "350px",
              height: "80px",
            }}
          >
            <div style={{ margin: "10px" }}>
              <p><strong>Job status</strong></p>
              <p>{userdata?.jobStatus}</p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "background.default",
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
            <p>{userdata?.about} </p>
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
              <li>{userdata?.experience}</li>
              {/* <li>Network Engineer</li> */}
            </ul>
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
            <h3>Education</h3>
            <ul>
              <li>{userdata?.education}</li>
              {/* <li>PG Diploma in Industrial Automation</li> */}
              {/* <li>CCNA</li> */}
            </ul>
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
            <h3>Skills</h3>
            <ul>
              <li>{userdata?.skills}</li>
              {/* <li>MERN stack developer trainee</li> */}
              {/* <li>MERN stack developer trainee</li> */}
            </ul>
          </div>
          
        </div>
      </Box>
    </Box>
  );
}

export default ViewProfile;
