import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/api';

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

  // Load user from cookies on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          // Verify token by fetching profile
          const response = await authService.getProfile();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          Cookies.remove('token');
          Cookies.remove('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const signup = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { user, access_token } = response.data;

      // Store token in cookie (expires in 7 days)
      Cookies.set('token', access_token, { expires: 7, sameSite: 'strict' });
      Cookies.set('user', JSON.stringify(user), { expires: 7, sameSite: 'strict' });

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      const { user, access_token } = response.data;

      // Store token in cookie (expires in 7 days)
      Cookies.set('token', access_token, { expires: 7, sameSite: 'strict' });
      Cookies.set('user', JSON.stringify(user), { expires: 7, sameSite: 'strict' });

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.error || 'Invalid email or password'
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('token');
      Cookies.remove('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
