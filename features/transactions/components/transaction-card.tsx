import { format } from 'date-fns';

type TransactionCardProps = {
  id: string;
  type: string;
  amount_in_cents: number;
  currency: string;
  status: string;
  destination_id: string;
  created_at: string;
};

export function TransactionCard({
  id,
  type,
  amount_in_cents = 0,
  currency = 'USD',
  status,
  destination_id,
  created_at,
}: TransactionCardProps) {
  const amount = (amount_in_cents / 100).toFixed(2);

  const date = format(new Date(created_at), 'MMM d, yyyy, h:mm aa');

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{type}</span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === 'SUCCESS'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mb-2 text-3xl font-bold text-gray-900">
        {currency === 'USD' && '$'}
        {amount}
      </div>

      <p className="mb-4 text-sm text-gray-600">
        To: <span className="font-medium text-gray-800">{destination_id}</span>
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>ID: {id}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
