import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendChatMessage = (message) => {
  return API.post("/chat", {
    message: message,
  });
};