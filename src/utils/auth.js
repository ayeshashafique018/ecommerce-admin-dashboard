import api from "../services/api";

// Login user and store in localStorage
export const loginUser = async (email, password) => {
  try {
    const { data } = await api.login({ email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    throw err.response?.data?.message || "Invalid credentials";
  }
};

// Logout
export const logout = () => localStorage.clear();

// Check if authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return token && user?.role ? true : false;
};

// Get current user info
export const getCurrentUser = () => JSON.parse(localStorage.getItem("user") || "{}");
