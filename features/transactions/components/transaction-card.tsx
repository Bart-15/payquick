import { format } from 'date-fns';

import type { Transaction } from '../types/transactions.types';

export function TransactionCard({ txn }: { txn: Transaction }) {
  const amount = (txn.amount_in_cents / 100).toFixed(2);

  const date = format(new Date(txn.created_at), 'MMM d, yyyy, h:mm aa');

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{txn.type}</span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            txn.status === 'SUCCESS'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {txn.status}
        </span>
      </div>

      <div className="mb-2 text-3xl font-bold text-gray-900">
        {txn.currency === 'USD' && '$'}
        {amount}
      </div>

      <p className="mb-4 text-sm text-gray-600">
        To:{' '}
        <span className="font-medium text-gray-800">{txn.destination_id}</span>
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>ID: {txn.id}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
