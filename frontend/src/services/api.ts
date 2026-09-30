import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3000' });
export const hoje = () => new Date().toISOString().slice(0,10);
export const gerarCodigo = () => 'CERT-' + Math.random().toString(36).substring(2,8).toUpperCase();
export const addMeses = (meses:number) => { const d = new Date(); d.setMonth(d.getMonth()+meses); return d.toISOString().slice(0,10); };
