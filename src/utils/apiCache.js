/**
 * Fetches data from a URL with caching in localStorage.
 * 
 * @param {string} key - The localStorage key to use.
 * @param {string} url - The URL to fetch data from.
 * @param {number} durationInMinutes - Cache duration in minutes (default: 60).
 * @returns {Promise<any>} - The fetched or cached data.
 */
export const fetchWithCache = async (key, url, durationInMinutes = 60) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const ageInMinutes = (Date.now() - timestamp) / (1000 * 60);
    
    if (ageInMinutes < durationInMinutes) {
      return data;
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${key}:`, error);
    // If fetch fails but we have stale cache, return it as fallback
    if (cached) {
      console.warn(`Returning stale cache for ${key}`);
      return JSON.parse(cached).data;
    }
    throw error;
  }
};
