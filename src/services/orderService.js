import api from './api';

/**
 * Order Service - handles all order-related API calls
 */
const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data
   * @param {Object} orderData.customer - Customer info
   * @param {string} orderData.customer.name - Customer name
   * @param {string} orderData.customer.phone - Customer phone
   * @param {Object} orderData.customer.address - Address object
   * @param {string} orderData.customer.address.city - City
   * @param {string} orderData.customer.address.street - Street
   * @param {string} orderData.customer.address.building - Building
   * @param {Array} orderData.items - Order items
   * @param {number} orderData.items[].product_id - Product ID
   * @param {number} orderData.items[].quantity - Quantity
   * @param {string} orderData.notes - Optional notes
   * @returns {Promise<Object>} - { success, message, data }
   */
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Get order details by ID
   * @param {number} orderId - Order ID
   * @returns {Promise<Object>} - { success, data }
   */
  async getOrder(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Download invoice PDF by invoice number
   * @param {string} invoiceNumber - Invoice number (e.g., INV-20251127-00001)
   * @returns {Promise<Blob>} - PDF blob
   */
  async downloadInvoice(invoiceNumber) {
    try {
      const response = await api.get(`/orders/invoice/${invoiceNumber}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Transform cart items to order items format
   * @param {Array} cartItems - Cart items from CartContext
   * @returns {Array} - Formatted order items
   */
  formatCartItems(cartItems) {
    return cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
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

export default orderService;

