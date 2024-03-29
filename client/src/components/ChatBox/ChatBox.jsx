import React, { useContext, useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { Button } from "@mui/material";

function ChatBox({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
  notifications,
  setNotifications,
}) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat?._id) {
      setMessages([...messages, receiveMessage]);
    } else {
      setNotifications([chat, ...notifications]);
    }
  }, [receiveMessage]);

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        console.log("chatbox", userId);
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) getUserData();
  }, [chat, currentUser]);

  //   fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log("fetchmessages", data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // always scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log("messages", messages);

  return (
    <>
      <div className="ChatBox-container" style={{ scrollbarWidth: "none" }}>
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div style={{ display: "flex" }}>
                  <img
                    src={userData?.pic}
                    alt=""
                    className="followerImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderradius: "50%",
                    }}
                  />

                  <div
                    className="name"
                    style={{
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>{userData?.name}</span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "95%", border: "0.1px solid #ececec" }} />
            </div>
            {/* chatBox Messages */}
            <div className="chat-body">
              {messages.map((message, index) => (
                <>
                  <div
                    ref={scroll}
                    key={index}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <Button variant="contained" onClick={handleSend}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
