import api from './api';

/**
 * Product Service - handles all product-related API calls
 */
const productService = {
  /**
   * Get all products with optional filters
   * @param {Object} params - Query parameters
   * @param {boolean} params.active - Filter by active status
   * @param {string} params.q - Search query
   * @param {number} params.per_page - Items per page
   * @param {number} params.page - Page number
   * @returns {Promise<Object>} - { success, data, meta }
   */
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Get a single product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object>} - { success, data }
   */
  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Get all coming/upcoming products
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - { success, data, meta }
   */
  async getComingProducts(params = {}) {
    try {
      const response = await api.get('/coming-products', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Handle API errors consistently
   * @param {Error} error - Axios error
   * @returns {Error} - Formatted error
   */
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      const err = new Error(message);
      err.status = error.response.status;
      err.errors = error.response.data?.errors;
      return err;
    }
    return new Error('Network error. Please check your connection.');
  },
};

export default productService;

