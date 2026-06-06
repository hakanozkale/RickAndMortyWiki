import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query Client — Merkezi veri yönetimi
 * 
 * - staleTime: 5 dakika → veri 5dk boyunca "taze" kabul edilir, tekrar fetch yapılmaz
 * - gcTime: 30 dakika → kullanılmayan cache 30dk sonra temizlenir
 * - retry: 2 → başarısız istekler 2 kez tekrar denenir
 * - refetchOnWindowFocus: false → pencere focus olduğunda otomatik refetch yapma
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
