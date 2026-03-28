import axios from "axios";
const API_URL = "http://localhost:5000/api/orders";


export const getOrders = async () => {
  return axios.get(API_URL);
};

export const updateOrder = async (id, updatedOrder) => {
  return axios.put(`${API_URL}/${id}`, updatedOrder);
};

export const deleteOrder = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
