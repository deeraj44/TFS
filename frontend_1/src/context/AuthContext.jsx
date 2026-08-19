import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchMe, loginUser, registerUser } from '../api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('fs_token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem('fs_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await loginUser({ email, password });
    localStorage.setItem('fs_token', data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(name, email, password, phone) {
    const data = await registerUser({ name, email, password, phone });
    localStorage.setItem('fs_token', data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('fs_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
