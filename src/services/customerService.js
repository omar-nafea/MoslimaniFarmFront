import api from './api';

/**
 * Customer Service - handles customer-related API calls
 */
const customerService = {
  /**
   * Create or update customer (auto-matches by phone)
   * @param {Object} customerData - Customer data
   * @param {string} customerData.name - Customer name
   * @param {string} customerData.phone - Customer phone (used for matching)
   * @param {string} customerData.address_city - City
   * @param {string} customerData.address_street - Street
   * @param {string} customerData.address_building - Building
   * @returns {Promise<Object>} - { success, message, data, is_new }
   */
  async createOrUpdate(customerData) {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Update existing customer by ID
   * @param {number} customerId - Customer ID
   * @param {Object} customerData - Customer data to update
   * @returns {Promise<Object>} - { success, message, data }
   */
  async update(customerId, customerData) {
    try {
      const response = await api.patch(`/customers/${customerId}`, customerData);
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

export default customerService;

