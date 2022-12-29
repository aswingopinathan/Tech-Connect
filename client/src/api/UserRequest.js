import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userInfo')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const getAllUsers = (userId) => API.get(`/getsuggestions/${userId}`);
export const getConnections = (userId) => API.get(`/getconnections/${userId}`);

export const findNotify = (userId) => API.get(`/findnotifications/${userId}`);


