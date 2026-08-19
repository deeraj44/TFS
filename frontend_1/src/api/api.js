import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token (if present) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fs_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth ---
export const registerUser = (payload) => api.post('/auth/register', payload).then((r) => r.data);
export const loginUser = (payload) => api.post('/auth/login', payload).then((r) => r.data);
export const fetchMe = () => api.get('/auth/me').then((r) => r.data);

// --- Product ---
export const fetchProduct = () => api.get('/product').then((r) => r.data);

// --- Reviews ---
export const fetchReviews = () => api.get('/reviews').then((r) => r.data);
export const submitReview = (payload) => api.post('/reviews', payload).then((r) => r.data);

// --- Orders ---
export const createOrder = (payload) => api.post('/orders', payload).then((r) => r.data);
export const verifyUpiPayment = (payload) => api.post('/orders/verify-upi', payload).then((r) => r.data);
export const fetchOrder = (id) => api.get(`/orders/${id}`).then((r) => r.data);

export default api;
