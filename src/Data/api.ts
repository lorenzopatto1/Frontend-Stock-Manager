import axios from 'axios';

export const api = axios.create({
  baseURL: "https://localhost:44307/",
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true,
})