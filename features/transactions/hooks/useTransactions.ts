import { useInfiniteQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers/auth-provider';
import { QUERY_KEYS } from '@/shared/constants/const';

import { fetchTransactions } from '../services/transactions.service';

/**
 * Hook for fetching paginated transactions
 * @param {number} limit - Number of transactions per page (default: 5)
 * @returns {UseInfiniteQueryResult} Infinite query result with transaction data and pagination
 * @example
 * const { data, fetchNextPage, hasNextPage } = useTransactions(10)
 */
export const useTransactions = (limit = 5) => {
  const { authSession } = useAuth();

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS],
    enabled: !!authSession,
    queryFn: ({ pageParam = 1 }) =>
      fetchTransactions({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.current_page < lastPage.pagination.total_pages) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
