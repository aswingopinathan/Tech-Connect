import { Button } from "@mui/material";
import React from "react";
import logo from "../images/homeImage.png";
import "./Content.css";
import { useNavigate } from "react-router-dom";

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
        <img style={homeImage} src={logo} alt=""></img>
      </div>
    </div>
  );
}

export default Content;
