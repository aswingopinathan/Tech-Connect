import React, { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../api/UserRequest";
import "./Conversation.css";

function Conversation({ data, currentUserId, online }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    console.log("currentUserId", currentUserId);
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation" style={{ scrollbarWidth: "none" }}>
        <div style={{ display: "flex" }}>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.pic}
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px", borderradius: "50%" }}
          />
          <div
            className="name"
            style={{
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <span>{userData?.name}</span>
              <br></br>
              <span>{online ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}

export default Conversation;
