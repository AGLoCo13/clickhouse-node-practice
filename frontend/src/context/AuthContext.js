// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const api = axios.create({
  baseURL: 'http://localhost:3000', // or use import.meta.env / REACT_APP_API_BASE
  withCredentials: true
});

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth state on app load
  useEffect(() => {
    api.get('/auth/me',{
        withCredentials: true,
    })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    await api.post('/auth/login', { email, password });
    setIsAuth(true);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setIsAuth(false);
  };

  if (loading) return <div>Loading...</div>; // Optional loader

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
