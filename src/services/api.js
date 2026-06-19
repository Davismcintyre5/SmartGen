import axios from 'axios';

const api = axios.create({
  baseURL: 'https://docusoftserver.pxxl.click',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('smartgen_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('smartgen_token');
  }
  return Promise.reject(err);
});

export default api;