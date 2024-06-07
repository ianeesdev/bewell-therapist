import axios from "axios";
import {
  setLocalStorageItem,
  removeLocalStorageItems,
} from "../../../../lib/utils.ts";

const API_URL = "http://127.0.0.1:5005/therapist/auth";

// Register user
const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Registration failed");
  }
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    setLocalStorageItem("therapist", JSON.stringify(response.data));
  }

  return response.data;
};

// Profile save
const saveProfile = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/profile`, data, config);

  if (response.data) {
    setLocalStorageItem("therapist", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  if (typeof window !== "undefined") {
    removeLocalStorageItems([
      "therapist",
      "therapistAppointments",
      "chats",
      "messages",
      "activeChat",
    ]);
  }
};

const authService = {
  register,
  logout,
  login,
  saveProfile,
};

export default authService;
