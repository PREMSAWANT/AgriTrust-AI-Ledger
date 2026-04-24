import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add token to headers if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const getBatches = () => API.get('/batches');
export const createBatch = (batchData) => API.post('/batches', batchData);
export const getBatchDetails = (id) => API.get(`/batches/${id}`);
export const addTracking = (trackingData) => API.post('/tracking', trackingData);

export default API;
