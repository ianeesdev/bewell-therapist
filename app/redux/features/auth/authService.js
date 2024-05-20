import axios from "axios";

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
    localStorage.setItem("therapist", JSON.stringify(response.data));
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
    localStorage.setItem("therapist", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.clear();
  localStorage.removeItem("therapist");
  localStorage.removeItem("therapistAppointments");
  localStorage.removeItem("chats");
  localStorage.removeItem("messages");
  localStorage.removeItem("activeChat");
};

const authService = {
  register,
  logout,
  login,
  saveProfile,
};

export default authService;
