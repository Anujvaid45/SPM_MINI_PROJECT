import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
};

export const planService = {
  getPlans: () => api.get('/plans'),
  createPlan: (planData) => api.post('/plans', planData),
};

export const transactionService = {
  createTransaction: (transactionData) => api.post('/transactions', transactionData),
  getUserTransactions: () => api.get('/transactions'),
};

export default api;