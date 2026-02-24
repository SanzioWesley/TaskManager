// import axios from 'axios';
// import type { AxiosInstance } from 'axios';

// const api: AxiosInstance = axios.create({
//     baseURL: 'https://localhost:7138/api', // SUA PORTA AQUI!
//     httpsAgent: {
//         rejectUnauthorized: false
//     }
// });

// export default api;



import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7138/api',
  // Ignorar certificado SSL em desenvolvimento
  httpsAgent: {
    rejectUnauthorized: false
  }
});

// Interceptor para logs
api.interceptors.request.use(request => {
  console.log('➡️ Request:', request.method, request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('⬅️ Response:', response.status);
    return response;
  },
  error => {
    console.error('❌ Response Error:', error.message);
    return Promise.reject(error);
  }
);

export default api;