
import axios from 'axios';

const API_URL = 'https://eatoes-seven.vercel.app'; 

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  signup: (name: string, email: string, password: string) => {
    return api.post('/api/auth/signup', { name, email, password });
  },
  login: (email: string, password: string) => {
    return api.post('/api/auth/login', { email, password });
  },
};

// Menu services
export const menuService = {
  getMenuItems: () => {
    return api.get('/api/menu');
  },
};

// Order services
export const orderService = {
  placeOrder: (items: { menuItemId: number; quantity: number }[], phoneNumber: string, totalPrice: number) => {
    return api.post('/api/order', { items, phoneNumber, totalPrice });
  },
};

// Order history services
export const orderHistoryService = {
  getOrdersByPhoneNumber: (phoneNumber: string) => {
    return api.get(`/api/order/${phoneNumber}`);
  },
};

export default api;
