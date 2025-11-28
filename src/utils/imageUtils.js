/**
 * Image utility functions
 */

const API_URL =
  import.meta.env.VITE_API_URL || "https:/302ce27185c1.ngrok-free.app/api";
const STORAGE_URL = API_URL.replace("/api", "/storage");

/**
 * Normalize an image URL to be absolute
 * @param {string} url - The image URL (can be relative or absolute)
 * @param {string} fallbackPath - Fallback path if URL is relative
 * @returns {string} - Absolute URL
 */
export const normalizeImageUrl = (url, fallbackPath = "images") => {
  if (!url) return null;

  // If already absolute URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If starts with /storage, prepend base URL
  if (url.startsWith("/storage")) {
    return `${STORAGE_URL.replace("/storage", "")}${url}`;
  }

  // Otherwise, assume it's a relative path
  return `${STORAGE_URL}/${fallbackPath}/${url}`;
};

/**
 * Get cached image URL (for now, just returns the URL)
 * In the future, this could implement caching logic
 * @param {string} url - Image URL
 * @returns {Promise<string>} - Image URL
 */
export const getCachedImage = async (url) => {
  return url;
};

/**
 * Get placeholder image URL
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = () => {
  return "/placeholder-product.jpg";
};

export default {
  normalizeImageUrl,
  getCachedImage,
  getPlaceholderImage,
};
