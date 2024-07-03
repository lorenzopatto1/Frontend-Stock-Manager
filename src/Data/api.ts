import axios from 'axios';

export const api = axios.create({
  baseURL: "https://backend-stock-manager-1.onrender.com/",
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true,
})