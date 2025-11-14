import { QueryClient } from '@tanstack/react-query';

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 5 * (60 * 1000), // 5 mins, it depends
        refetchInterval: 6 * (60 * 1000), // 6 mins
      },
    },
  }); // soon, will edit the global config
}

export const queryClient = generateQueryClient();
