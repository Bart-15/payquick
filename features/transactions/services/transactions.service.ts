import { axiosInstance } from '@/shared/lib/axios-instance';

import type { TransactionsResponse } from '../types/transactions.types';

interface FetchTransactionsParams {
  page: number;
  limit?: number;
}

export const fetchTransactions = async ({
  page,
  limit = 5,
}: FetchTransactionsParams) => {
  const response = await axiosInstance.get<TransactionsResponse>(
    '/transactions',
    {
      params: {
        page,
        limit,
      },
    },
  );
  return response.data;
};
