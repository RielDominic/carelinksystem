// client/src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend runs elsewhere
  withCredentials: false, // set true if you switch to cookies
});

// Attach JWT from localStorage to each request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
