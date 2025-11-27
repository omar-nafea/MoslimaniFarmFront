/**
 * Normalizes image URLs from the backend to ensure they are absolute URLs
 * @param {string|null} imageUrl - The image URL from the backend
 * @param {string} defaultPath - Default storage path (e.g., 'images/products' or 'images/coming_products')
 * @returns {string} - Normalized absolute URL
 */
export const normalizeImageUrl = (imageUrl, defaultPath = 'images/products') => {
  const API_BASE_URL = 'http://127.0.0.1:8000';
  
  // If no image URL provided, return placeholder
  if (!imageUrl) {
    return '/placeholder-product.jpg';
  }
  
  // If already an absolute URL (http/https), normalize localhost to API_BASE_URL
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // Replace localhost with the actual API base URL for consistency
    if (imageUrl.includes('localhost')) {
      return imageUrl.replace(/http:\/\/localhost/, API_BASE_URL);
    }
    return imageUrl;
  }
  
  // If starts with /storage/, make it absolute
  if (imageUrl.startsWith('/storage/')) {
    return `${API_BASE_URL}${imageUrl}`;
  }
  
  // If starts with storage/ (without leading slash), add base URL
  if (imageUrl.startsWith('storage/')) {
    return `${API_BASE_URL}/${imageUrl}`;
  }
  
  // If it's just a filename without path, prepend default path
  if (!imageUrl.includes('/')) {
    return `${API_BASE_URL}/storage/${defaultPath}/${imageUrl}`;
  }
  
  // Otherwise, assume it's a relative path and prepend storage
  return `${API_BASE_URL}/storage/${imageUrl}`;
};

