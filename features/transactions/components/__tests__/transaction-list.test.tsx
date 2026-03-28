import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/mocks/server';
import {
  createAuthProviderWrapper,
  createComposedWrapper,
  createQueryClientWrapper,
} from '@/shared/testing/wrappers/test-wrappers';

import TransactionList from '../transaction-list';

jest.mock('../transaction-card', () => ({
  TransactionCard: ({ id }: { id: string }) => <div>Transaction {id}</div>,
}));

const wrapper = createComposedWrapper([
  createAuthProviderWrapper(),
  createQueryClientWrapper(),
]);

describe('TransactionList', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000/';
    process.env.NEXT_PUBLIC_API_VERSION = 'api/v1'; // optional if version is empty
    sessionStorage.setItem(
      'authSession',
      JSON.stringify({
        access_token: 'mock-token',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
      }),
    );
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('shows loading then transactions (success)', async () => {
    render(<TransactionList />, { wrapper });

    expect(screen.getByText(/Loading transactions…/i)).toBeInTheDocument();

    expect(
      await screen.findByText('Transaction txn_abc123def456'),
    ).toBeInTheDocument();
    expect(screen.getByText('Transaction txn_ab94430r')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    server.use(
      http.get('http://localhost:3000/api/v1/transactions', () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 },
        );
      }),
    );

    render(<TransactionList />, { wrapper });

    // Loading
    expect(screen.getByText(/Loading transactions…/i)).toBeInTheDocument();

    // Error
    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load transactions/i),
      ).toBeInTheDocument(),
    );
  });
});
