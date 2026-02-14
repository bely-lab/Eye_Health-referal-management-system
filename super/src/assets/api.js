import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const register = (username, password, role) => {
  return api.post('/register', { username, password, role });
};

export const login = (username, password) => {
  return api.post('/login', { username, password });
};

export const getProtected = (token) => {
  return api.get('/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
