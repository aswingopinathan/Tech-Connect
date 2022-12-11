import React from 'react'
import NavBar from '../../components/NavBar'
import "./Chat.css";
// import "./index.css";
import { useState,useEffect } from 'react';
import { userChats } from '../../api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';


function Chat() {

  const userData = JSON.parse(localStorage.getItem("userInfo"));

    const [chats,setChats] = useState([])

    useEffect(()=>{
        const getChats = async()=>{
            try {
                const {data} =await userChats(userData._id)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    },[])

  return (
    <>
        <NavBar/>
        <div className="Chat">
            
            {/* Left side chat */}
            <div className="Left-side-chat">
                
                <div className='Chat-container'>
                <h2>Chats</h2>
                <div className="Chat-list">
                    {chats.map((chat)=>(
                        <div>
                            <Conversation data={chat} currentUser = {userData._id}/>
                        </div>
                    ))}
                </div>
                </div>

            </div>

            {/* Right side chat */}
            <div className="Right-side-chat">
                Right side
            </div>
        </div>
    </>
  )
}

export default Chat