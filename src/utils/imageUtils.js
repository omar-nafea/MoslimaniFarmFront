/**
 * Image utility functions
 */

const API_URL =
  import.meta.env.VITE_API_URL || "https://302ce27185c1.ngrok-free.app/api";
const BASE_URL = API_URL.replace("/api", "");

// Default placeholder as a data URL
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Cpath d='M200 120c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80zm0 140c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z' fill='%23d1d5db'/%3E%3Ccircle cx='200' cy='200' r='20' fill='%23d1d5db'/%3E%3Ctext x='200' y='320' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";

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
    return `${BASE_URL}${url}`;
  }

  // If starts with /images, prepend base URL
  if (url.startsWith("/images")) {
    return `${BASE_URL}${url}`;
  }

  // Otherwise, assume it's a relative path to images
  return `${BASE_URL}/images/${fallbackPath}/${url}`;
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
  return PLACEHOLDER_IMAGE;
};

export default {
  normalizeImageUrl,
  getCachedImage,
  getPlaceholderImage,
};
