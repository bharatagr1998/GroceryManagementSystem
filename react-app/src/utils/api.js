import axios from 'axios';
import { getToken } from './storage';

const  API_BASE_URL = 'http://192.168.0.76:9999'; // Replace with your actual backend URL

export const getUrl = () => {
  return API_BASE_URL;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

const getAuthHeader = async () => {
  const token = await getToken(); // Use await to get the token asynchronously
  return {
    headers: {
      token: `${token}`, // Attach token in the Authorization header
    },
  };
};

// Customer Authentication
export const login = async (credentials) => {
  const { data } = await apiClient.post('/customer/signin', credentials);
  return data;
};

export const register = async (userData) => {
  await apiClient.post('/customer/signup', userData);
};

// Admin Authentication
export const adminSignIn = async (credentials) => {
  const { data } = await apiClient.post('/admin/signin', credentials);
  return data;
};

export const adminSignUp = async (data) => {
  await apiClient.post('/admin/signup', data);
};

// Categories
export const getCategories = async () => {
  const headers = await getAuthHeader();
  const { data } = await apiClient.get('/admin/categories', headers);
  return data;
};

export const addCategory = async (data) => {
  const headers = await getAuthHeader();
  await apiClient.post('/admin/categories/add', data, headers);
};

export const deleteCategory = async (id) => {
  const headers = await getAuthHeader();
  await apiClient.delete(`/admin/categories/delete/${id}`, headers);
};

// Products
export const getProducts = async () => {
  const headers = await getAuthHeader();
  const { data } = await apiClient.get('/customer/getProducts', headers);
  return data;
};

export const addProduct = async (data) => {
  const headers = await getAuthHeader();
  await apiClient.post('/customer/products/add', data, headers);
};

export const getProductImage = async (productId) => {
  const headers = await getAuthHeader();
  const { data } = await apiClient.get(`/customer/image/${productId}`, {
    ...headers,
    responseType: 'blob',
  });
  return data;
};

// CartItems
export const getCartItems = async (customerId) => {
  const headers = await getAuthHeader();
  const { data } = await apiClient.get(`/customer/cartitems/all/${customerId}`, headers);
  return data;
};

export const addCartItem = async (cartId, productId) => {
  const headers = await getAuthHeader();
  await apiClient.post(`/customer/cartitems/add/${cartId}/${productId}`, { Quantity: 1 }, headers);
};

export const removeCartItem = async (id) => {
  const headers = await getAuthHeader();
  await apiClient.delete(`/customer/cartitems/delete/single/${id}`, headers);
};

// Orders
export const getOrders = async (customerId) => {
  const headers = await getAuthHeader();
  const { data } = await apiClient.get(`/customer/orders/all/${customerId}`, headers);
  return data;
};

export const placeOrder = async (customerId, data) => {
  const headers = await getAuthHeader();
  await apiClient.post(`/customer/orders/addorder/${customerId}`, data, headers);
};
