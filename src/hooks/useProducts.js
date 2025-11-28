import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services';

/**
 * Custom hook for fetching and managing products
 * @param {Object} options - Options for fetching products
 * @param {boolean} options.active - Filter by active status
 * @param {number} options.perPage - Items per page
 * @returns {Object} - { products, loading, error, refetch, meta }
 */
export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getProducts({
        active: options.active ?? true,
        per_page: options.perPage ?? 50,
        ...params,
      });
      
      if (response.success) {
        setProducts(response.data);
        setMeta(response.meta);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [options.active, options.perPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    meta,
  };
};

/**
 * Custom hook for fetching coming products
 * @param {Object} options - Options for fetching
 * @returns {Object} - { products, loading, error, refetch }
 */
export const useComingProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getComingProducts({
        active: options.active ?? true,
      });
      
      if (response.success) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch coming products:', err);
      setError(err.message || 'Failed to load coming products');
    } finally {
      setLoading(false);
    }
  }, [options.active]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

export default useProducts;

