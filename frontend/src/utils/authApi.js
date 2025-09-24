// frontend/src/utils/authApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend URL differs
});

// Register
export const registerUser = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data;
};

// Login — must return { token, user }
export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

// Get profile using token
export const getProfile = async (token) => {
  const res = await API.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// helper that returns headers for protected calls
export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
