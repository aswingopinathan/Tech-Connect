import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css"
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")

// fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id == currentUser);
    // console.log('userId',userId);
    const getUserData = async () => {
      try {
        console.log('chatbox',userId);
        const { data } = await getUser(userId);
        setUserData(data);
        // console.log("data", data);
      } catch (error) { 
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

//   fetching data for messages
  useEffect(()=>{
    const fetchMessages = async()=>{
        try {
            const {data} = await getMessages(chat._id)
            console.log("fetchmessages",data);
            setMessages(data)
        } catch (error) {
            console.log(error);
        }
    }
    if(chat!==null) fetchMessages();
  },[chat])

  const handleChange = (newMessage)=>{
    setNewMessage(newMessage)
  }
  return (
    <>
      <div className="ChatBox-container">
        {chat?(<>
          <div className="chat-header">
            <div className="follower">
              <div style={{ display: "flex" }}>
                <img
                  src={userData?.pic}
                  alt=""
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <span>{userData?.name}</span>
                </div>
              </div>
            </div>
      <hr style={{width: '85%',border: '0.1px solid #ececec'}}/>
          </div>
{/* chatBox Messages */}
        <div className="chat-body">
            {messages.map((message)=>(
                <>
                <div className={message.senderId === currentUser ? "message own": "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>

                </div>
                </>
            ))}
        </div>

        {/* chat sender */}
        <div className="chat-sender">
            <div>+</div>
            <InputEmoji
            value={newMessage}
            onChange={handleChange}
            />
            <div className="send-button">Send</div>
        </div>
        </>):(<span className="chatbox-empty-message">
            Tap on a chat to start conversation...</span>)}
      </div> 
    </>
  );
}

export default ChatBox;
