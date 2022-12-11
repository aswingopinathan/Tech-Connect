import React, { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../api/UserRequest";

function Conversation({ data, currentUserId }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    // console.log('userId',userId);
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
  //  let pic = userData[0].pic;
  //  console.log('pic',pic);
  return (
    <>
      <div className="follower conversation">
        <div style={{display:'flex'}}>
          <div className="online-dot"></div>
          <img
            src={userData?.pic}
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{userData?.name}</span>
            <br></br>
            <span>Online</span>
          </div>
        </div>
      </div>
      <hr style={{width: '85%',border: '0.1px solid #ececec'}}/>
    </>
  );
}

export default Conversation;
