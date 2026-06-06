import axios from 'axios';

/**
 * Merkezi Axios instance — tüm API istekleri bu client üzerinden yapılır.
 * 
 * Avantajlar:
 * - Tek noktada baseURL, timeout, headers yönetimi
 * - Interceptor'lar ile merkezi error handling & logging
 * - Kolay genişletilebilirlik (auth token, retry logic vb.)
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'https://rickandmortyapi.com/api',
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
  },
});

// Response Interceptor — merkezi hata yakalama ve loglama
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;

    if (import.meta.env.DEV) {
      console.error(`[API Error] ${status || 'NETWORK'}: ${message}`);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
