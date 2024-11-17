import axios from 'axios';

// Substitua pelo IP ou URL do seu servidor
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Você pode configurar interceptors, headers ou autenticação JWT aqui
api.interceptors.request.use(
  (config) => {
    // Adicione um token JWT, se necessário
    const token = 'seu-token-jwt';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
