import { http, HttpResponse } from 'msw';

/* export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: 'Bart' }));
  }),
];
 */

export const handlers = [
  http.get('http://localhost:3000/api/v1/transactions', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const limit = Number(url.searchParams.get('limit') ?? 5);

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
      {
        id: 'txn_abc123def4123156',
        amount_in_cents: 5025,
        currency: 'USD',
        type: 'TRANSFER',
        status: 'SUCCESS',
        created_at: '2025-08-09T10:30:00Z',
        destination_id: 'wal_20251009-TRF3',
      },
      {
        id: 'txn_abc123def8456',
        amount_in_cents: 3200,
        currency: 'USD',
        type: 'TOPUP',
        status: 'SUCCESS',
        created_at: '2025-08-09T10:30:00Z',
        destination_id: 'wal_20251009-001TP',
      },
      {
        id: 'txn_def789ghi012',
        amount_in_cents: 7500,
        currency: 'USD',
        type: 'TRANSFER',
        status: 'SUCCESS',
        created_at: '2025-07-15T14:20:00Z',
        destination_id: 'wal_20251009-TRF2',
      },
      {
        id: 'txn_xyz456abc789',
        amount_in_cents: 12000,
        currency: 'USD',
        type: 'TOPUP',
        status: 'SUCCESS',
        created_at: '2025-07-10T09:15:00Z',
        destination_id: 'wal_20251009-002TP',
      },
      {
        id: 'txn_mno345pqr678',
        amount_in_cents: 4250,
        currency: 'USD',
        type: 'TRANSFER',
        status: 'SUCCESS',
        created_at: '2025-06-20T16:45:00Z',
        destination_id: 'wal_20251009-TRF1',
      },
      {
        id: 'txn_stu901vwx234',
        amount_in_cents: 8900,
        currency: 'USD',
        type: 'TOPUP',
        status: 'SUCCESS',
        created_at: '2025-06-15T11:30:00Z',
        destination_id: 'wal_20251009-003TP',
      },
      {
        id: 'txn_jkl567mno890',
        amount_in_cents: 6300,
        currency: 'USD',
        type: 'TRANSFER',
        status: 'SUCCESS',
        created_at: '2025-05-28T13:00:00Z',
        destination_id: 'wal_20251009-TRF0',
      },
    ];

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = allData.slice(start, end);

    return HttpResponse.json({
      status: 'success',
      message: `Returning items ${start + 1}-${Math.min(end, allData.length)}`,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(allData.length / limit),
        total_items: allData.length,
        items_per_page: limit,
      },
      data: paginatedData,
    });
  }),
];
