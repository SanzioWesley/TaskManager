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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros globais
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Só redireciona se o erro for 401 E NÃO for na rota de login ou register
    const isAuthRoute = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');

    if (error.response?.status === 401 && !isAuthRoute) {
      logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;