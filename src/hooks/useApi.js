import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '../api/apiClient';

/**
 * Custom hook — API isteklerini yönetir.
 * 
 * Özellikler:
 * - AbortController ile component unmount olduğunda request iptal edilir
 * - Otomatik loading, data, error state yönetimi
 * - refetch() ile isteğe bağlı yeniden yükleme
 * - Dependency değiştiğinde otomatik yeniden fetch
 * 
 * @param {string|null} endpoint - API endpoint (null ise istek yapılmaz)
 * @param {object} options - Axios istek seçenekleri
 * @returns {{ data, loading, error, refetch }}
 */
export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    // Önceki isteği iptal et
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(endpoint, {
        ...options,
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        setData(response.data);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
