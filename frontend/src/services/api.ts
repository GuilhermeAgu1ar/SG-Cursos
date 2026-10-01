import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3000' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const hoje = () => new Date().toISOString().slice(0,10);
export const gerarCodigo = () => 'CERT-' + Math.random().toString(36).substring(2,8).toUpperCase();
export const addMeses = (meses:number) => { const d = new Date(); d.setMonth(d.getMonth()+meses); return d.toISOString().slice(0,10); };
