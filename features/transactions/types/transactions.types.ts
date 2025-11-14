export type Transaction = {
  id: string;
  amount_in_cents: number;
  currency: string;
  type: 'TRANSFER' | 'TOPUP';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  created_at: string;
  destination_id: string;
};

export type PaginationInfo = {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
};

export type ApiResponse<T> = {
  status: 'success' | 'error';
  message: string;
  pagination: PaginationInfo;
  data: T;
};

export type TransactionsResponse = ApiResponse<Transaction[]>;
