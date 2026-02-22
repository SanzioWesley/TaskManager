import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7138/api', // SUA PORTA AQUI!
    httpsAgent: {
        rejectUnauthorized: false
    }
});

export default api;