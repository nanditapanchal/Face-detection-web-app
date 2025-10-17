import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserFromStorage, setUserToStorage, clearUserFromStorage } from '../utils/authHelpers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  const login = (userData) => {
    setUser(userData.user);
    setUserToStorage(userData);
  };

  const logout = () => {
    setUser(null);
    clearUserFromStorage();
  };

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
