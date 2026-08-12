'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('thraamed_admin_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Prototype authentication check
    if (email && password) {
      const userData = { email };
      localStorage.setItem('thraamed_admin_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    localStorage.removeItem('thraamed_admin_user');
    setUser(null);
  };

  return { user, loading, login, logout };
}
