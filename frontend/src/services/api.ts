import axios from 'axios';
import { getToken, logout } from './authService';

const api = axios.create({
  baseURL: 'https://localhost:7138/api',
  timeout: 10000,
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('➡️ Request:', config.method, config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => {
    console.log('⬅️ Response:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);

    if (error.response?.status === 401) {
      // Token expirado ou inválido
      logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;