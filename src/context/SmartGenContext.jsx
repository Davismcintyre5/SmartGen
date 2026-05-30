import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const SmartGenContext = createContext(null);

export const SmartGenProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('smartgen_token');
    if (token) {
      api.get('/smartgen/api/auth/me').then(r => setUser(r.data)).catch(() => {});
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('smartgen_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('smartgen_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <SmartGenContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </SmartGenContext.Provider>
  );
};

export const useSmartGen = () => {
  const ctx = useContext(SmartGenContext);
  if (!ctx) throw new Error('useSmartGen must be used within SmartGenProvider');
  return ctx;
};