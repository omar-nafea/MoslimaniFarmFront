import api from './api';

/**
 * Auth Service - handles authentication API calls
 */
const authService = {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - { success, access_token, user, expires_in }
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success && response.data.access_token) {
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Logout - invalidate token
   * @returns {Promise<Object>} - { success, message }
   */
  async logout() {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      throw this.handleError(error);
    }
  },

  /**
   * Refresh JWT token
   * @returns {Promise<Object>} - { success, access_token, expires_in }
   */
  async refresh() {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.data.success && response.data.access_token) {
        localStorage.setItem('auth_token', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Get current authenticated user
   * @returns {Promise<Object>} - { success, user }
   */
  async me() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get stored user data
   * @returns {Object|null}
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get stored auth token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('auth_token');
  },

  /**
   * Handle API errors consistently
   * @param {Error} error - Axios error
   * @returns {Error} - Formatted error
   */
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 'Authentication failed';
      const err = new Error(message);
      err.status = error.response.status;
      err.errors = error.response.data?.errors;
      return err;
    }
    return new Error('Network error. Please check your connection.');
  },
};

export default authService;

