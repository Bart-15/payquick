import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { authStorage } from '@/features/auth/storage/auth.storage';
import { useAuth } from '@/providers/auth-provider';
import { QUERY_KEYS } from '@/shared/constants/const';

import { fetchTransactions } from '../services/transactions.service';

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
