import React from "react";
import "./Content.css";
import doubt from "../images/about1.png";
import interview from "../images/about2.png";
import work from "../images/about3.png";

function About() {
  const homeText1 = { marginTop: 300, marginLeft: 50, width: 600 };
  const homeImage = { marginTop: 90, marginLeft: 50, width: 600 };
  return (
    <div>
      <div className="homeMain1">
        <div style={homeText1}>
          <h1>Do you have any doubts about interviews?</h1>
          <h4>
            Not anymore, because we are providing highly classified and
            experienced Industrial experts. They will give you industry based
            advise for your career path.
          </h4>
        </div>
        <div>
          <img style={homeImage} src={doubt} alt=""></img>
        </div>
      </div>
      <div className="homeMain1">
        <div>
          <img style={homeImage} src={interview} alt=""></img>
        </div>
        <div style={homeText1}>
          <h1>Everything is practice</h1>
          <h4>
            You will get more chances to attend mock interviews. This practice
            with experts let you become a pro on interviews. You can communicate
            with Industrial experts and get to know the present work life in
            industry.
          </h4>
        </div>
      </div>
      <div className="homeMain1">
        <div style={homeText1}>
          <h1>Let’s connect with each other.</h1>
          <h4>
            You can connect with other developers. And share your ideas with
            everyone. This will help to grow your network and communication
            skills.
          </h4>
        </div>
        <div>
          <img style={homeImage} src={work} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default About;
