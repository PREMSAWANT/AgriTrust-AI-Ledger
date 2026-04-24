import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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
export const getBatches = () => API.get('/batches');
export const createBatch = (batchData) => API.post('/batches', batchData);
export const getBatchDetails = (id) => API.get(`/batches/${id}`);
export const addTracking = (trackingData) => API.post('/tracking', trackingData);

export default API;
