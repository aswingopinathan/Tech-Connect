import React from 'react'
import NavBar from '../../components/NavBar'
import "./Chat.css";
// import "./index.css";
import { useState,useEffect } from 'react';
import { userChats } from '../../api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/ChatBox/ChatBox';
import {io} from 'socket.io-client'
import { useRef } from 'react';

function Chat() {

  const userData = JSON.parse(localStorage.getItem("userInfo"));

    const [chats,setChats] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const [sendMessage,setSendMessage] = useState(null)
    const [receiveMessage,setReceiveMessage] = useState(null)


    const socket = useRef()

    // sending message to socket server
    useEffect(()=>{
        if(sendMessage!==null){
            socket.current.emit('send-message',sendMessage)
        }
    },[sendMessage])

    

    useEffect(()=>{
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add",userData._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users)
            console.log('onlineUsers',onlineUsers);
        })
    },[])

    // receive message from socket server
    useEffect(()=>{
        socket.current.on("receive-message",(data)=>{
            setReceiveMessage(data)
        })
    },[])

    useEffect(()=>{
        const getChats = async()=>{
            try {
                console.log('userData._id',userData._id);
                const {data} =await userChats(userData._id)
                setChats(data)
                console.log('Chat',data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    },[])
// dependency missing

const checkOnlineStatus = (chat)=>{
    const chatMember = chat.members.find((member)=> member!==userData._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online? true : false
}
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
                        <div onClick={()=> setCurrentChat(chat)}>
                            <Conversation data={chat} currentUserId = {userData._id} online={checkOnlineStatus(chat)}/>
                        </div>
                    ))}
                </div>
                </div>

            </div>

            {/* Right side chat */}
            <div className="Right-side-chat">
                {/* Right side */}
                <ChatBox chat={currentChat} currentUser={userData._id} setSendMessage={setSendMessage}
                receiveMessage={receiveMessage}/>
            </div>
        </div>
    </>
  )
}

export default Chat 