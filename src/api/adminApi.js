import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Backend base URL

// Axios instance for authenticated requests
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Attach token to each request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // always use "token"
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ================= LOGIN / SIGNUP =================
export const login = async (email, password) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  console.log(data);
  return data; // { token, user }
};

export const signup = async (name, email, password) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
  return data; // { token, user }
};

// ================= USERS =================
export const getUsers = async () => {
  const { data } = await axiosInstance.get("/users"); // protected
  return data;
};

export const getUser = async (id) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data;
};

export const updateUser = async (id, updatedData) => {
  const { data } = await axiosInstance.put(`/users/${id}`, updatedData);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};

// ================= PRODUCTS =================
const PRODUCT_URL = "/products"; // you can use axiosInstance if products are protected

export const getProducts = async () => {
  const { data } = await axiosInstance.get(PRODUCT_URL);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axiosInstance.post(PRODUCT_URL, product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await axiosInstance.put(`${PRODUCT_URL}/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`${PRODUCT_URL}/${id}`);
  return data;
};

// ================= ORDERS =================
const ORDER_URL = "/orders";

export const getOrders = async () => {
  const { data } = await axiosInstance.get(ORDER_URL);
  return data;
};

export const updateOrder = async (id, order) => {
  const { data } = await axiosInstance.put(`${ORDER_URL}/${id}`, order);
  return data;
};

export const deleteOrder = async (id) => {
  const { data } = await axiosInstance.delete(`${ORDER_URL}/${id}`);
  return data;
};
