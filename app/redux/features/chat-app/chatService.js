import axios from "axios";

const API_URL = "http://127.0.0.1:5009";

// Create a chat
const createOrOpenChat = async (userId, token) => {
  const response = await axios.post(`${API_URL}/chat`, userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("activeChat", JSON.stringify(response.data));
  }

  return response.data;
};

// Get user chats
const getUserChats = async (token) => {
  const response = await axios.get(`${API_URL}/chat`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("chats", JSON.stringify(response.data));
  }

  return response.data;
};

// Send Message
const sendMessage = async (data, token) => {
  const response = await axios.post(`${API_URL}/message`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("messages", JSON.stringify(response.data));
  }

  return response.data;
};

// Get all messages
const getMessages = async (chatId, token) => {
  const response = await axios.get(`${API_URL}/message/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("messages", JSON.stringify(response.data));
  }

  return response.data;
};


const chatService = {
  createOrOpenChat,
  getUserChats,
  sendMessage,
  getMessages
};

export default chatService;
