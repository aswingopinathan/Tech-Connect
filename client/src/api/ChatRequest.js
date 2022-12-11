import axios from 'axios'; 

const API = axios.create({baseURL: 'http://localhost:5000'})

// let id = JSON.parse(localStorage.getItem("userInfo")?._id)

export const userChats = (id) => API.get(`/chat/${id}`)