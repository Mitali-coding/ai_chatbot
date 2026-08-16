import axios from "axios";

const API = axios.create({
  baseURL: "https://aichatbot-production-3d6a.up.railway.app/api",
});

export const sendChatMessage = (message, mode = "friendly") => {
  return API.post("/chat", {
    message,
    mode,
  });
};