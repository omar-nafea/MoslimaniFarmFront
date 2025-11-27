const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Normalizes image URLs from the backend to ensure they are absolute URLs
 * @param {string|null} imageUrl - The image URL from the backend
 * @param {string} defaultPath - Default storage path (e.g., 'images/products' or 'images/coming_products')
 * @returns {string} - Normalized absolute URL
 */
export const normalizeImageUrl = (
  imageUrl,
  defaultPath = "images/products",
) => {
  // If no image URL provided, return placeholder
  if (!imageUrl) {
    return "/placeholder-product.jpg";
  }

  // If already an absolute URL (http/https), normalize localhost to API_BASE_URL
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    // Replace localhost with the actual API base URL for consistency
    if (imageUrl.includes("localhost")) {
      return imageUrl.replace(/http:\/\/localhost/, API_BASE_URL);
    }
    return imageUrl;
  }

  // If starts with /storage/, make it absolute
  if (imageUrl.startsWith("/storage/")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  // If starts with storage/ (without leading slash), add base URL
  if (imageUrl.startsWith("storage/")) {
    return `${API_BASE_URL}/${imageUrl}`;
  }

  // If it's just a filename without path, prepend default path
  if (!imageUrl.includes("/")) {
    return `${API_BASE_URL}/storage/${defaultPath}/${imageUrl}`;
  }

  // Otherwise, assume it's a relative path and prepend storage
  return `${API_BASE_URL}/storage/${imageUrl}`;
};

/**
 * Gets cached image URL or returns the original URL
 * Note: This version just returns the URL directly to avoid CORS issues.
 * Images are still cached by the browser's HTTP cache.
 * @param {string} imageUrl - The absolute URL of the image
 * @returns {Promise<string>} - The image URL
 */
export const getCachedImage = async (imageUrl) => {
  // Simply return the URL - browser will handle caching via HTTP cache headers
  // This avoids CORS issues when trying to fetch images as blobs
  return imageUrl || "/placeholder-product.jpg";
};

/**
 * Clears image cache from localStorage
 * @param {string} imageUrl - Optional specific image URL to clear, or clears all images if not provided
 */
export const clearImageCache = (imageUrl = null) => {
  if (imageUrl) {
    const cacheKey = `img_cache_${imageUrl}`;
    localStorage.removeItem(cacheKey);
  } else {
    // Clear all image caches
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("img_cache_")) {
        localStorage.removeItem(key);
      }
    });
  }
};
