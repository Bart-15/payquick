import { http, HttpResponse } from 'msw';

/* export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: 'Bart' }));
  }),
];
 */

const allData = [
  {
    id: 'txn_abc123def456',
    amount_in_cents: 5000,
    currency: 'USD',
    type: 'TRANSFER',
    status: 'SUCCESS',
    created_at: '2025-10-09T10:30:00Z',
    destination_id: 'wal_20251009-TRF5',
  },
  {
    id: 'txn_ab94430r',
    amount_in_cents: 300,
    currency: 'USD',
    type: 'TRANSFER',
    status: 'SUCCESS',
    created_at: '2025-10-09T10:30:00Z',
    destination_id: 'wal_20251009-TRF4',
  },
  {
    id: 'txn_abc24adf536',
    amount_in_cents: 10000,
    currency: 'USD',
    type: 'TOPUP',
    status: 'SUCCESS',
    created_at: '2025-09-09T10:30:00Z',
    destination_id: 'wal_20251009-001TP',
  },
  // ...add more if needed
];

export const handlers = [
  http.get('http://localhost:3000/api/v1/transactions', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const limit = Number(url.searchParams.get('limit') ?? 5);

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = allData.slice(start, end);

    return HttpResponse.json({
      data: paginatedData,
      status: 'success',
      message: 'Transactions retrieved successfully',
      pagination: {
        current_page: page,
        total_pages: Math.ceil(allData.length / limit),
        total_items: allData.length,
        items_per_page: limit,
      },
    });
  }),
];
