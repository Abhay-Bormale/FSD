import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Provider APIs
export const providerAPI = {
  getAll: () => api.get('/providers'),
  create: (data) => api.post('/providers', data),
};

// Appointment APIs
export const appointmentAPI = {
  book: (data) => api.post('/appointments', data),
  getByUser: (userId) => api.get(`/appointments/${userId}`),
  cancel: (appointmentId) => api.delete(`/appointments/${appointmentId}`),
};

export default api;
