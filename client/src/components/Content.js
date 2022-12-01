import { Button } from "@mui/material";
import React from "react";
import logo from "../images/homeImage.png";
import "./Content.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function Content() {
  const navigate = useNavigate();
  

  const homeText1 = { marginTop: 200, marginLeft: 50, width: 600 };
  const homeImage = { marginTop: 90, marginLeft: 80, width: 600 };
  const aboutButton = { marginLeft: 250 };
  const mainText = { fontSize: 50, fontWeight: 900 };
  return (
    <div className="homeMain">
      <div style={homeText1}>
        <h1 style={mainText}>
          Let’s Work Together and Explore the Opportunities.
        </h1>
        <h4>
          We have the largest collection of careers and 5+ years of experienced
          Industrial Experts for interviewing and advising.We are sure to have
          the resources you are looking for your future growth.
        </h4>
        <Button
          style={aboutButton}
          onClick={() => navigate("/about")}
          color="inherit"
        >
          About
        </Button>
      </div>
      
      <div>
        <Box sx={{ display: { xs: "none", sm: "none",md: "block" } }}>
        <img style={homeImage} src={logo} alt=""></img>
        </Box>
{/* <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_osdxlbqq.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player> */}
      </div>

    </div>
  );
}

export default Content;
