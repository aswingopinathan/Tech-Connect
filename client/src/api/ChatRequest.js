import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const userChats = (id) => API.get(`/chat/${id}`);
export const findChat = (senderId, receiverId) =>
  API.get(`/chat/find/${senderId}/${receiverId}`);
