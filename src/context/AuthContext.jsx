import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signup = (userData) => {
    // In a real app, this would make an API call
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('userPassword', userData.password); // In real app, never store passwords!
    setUser(newUser);
    setIsAuthenticated(true);

    return { success: true, user: newUser };
  };

  const login = (email, password) => {
    // In a real app, this would validate against a backend
    const storedPassword = localStorage.getItem('userPassword');
    const storedUser = localStorage.getItem('user');

    if (storedUser && storedPassword === password) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      return { success: true, user: parsedUser };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userPassword');
    setUser(null);
    setIsAuthenticated(false);
  };

  const verifyPhone = (otp) => {
    // Mock verification - in real app, this would verify with backend/SMS service
    if (otp === '123456' || otp.length === 6) {
      if (user) {
        const updatedUser = { ...user, phoneVerified: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid OTP' };
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
    verifyPhone,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
