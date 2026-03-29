import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/mocks/server';
import {
  createAuthProviderWrapper,
  createComposedWrapper,
  createQueryClientWrapper,
} from '@/shared/testing/wrappers/test-wrappers';

import TransactionList from '../transaction-list';

const wrapper = createComposedWrapper([
  createAuthProviderWrapper(),
  createQueryClientWrapper(),
]);

describe('TransactionList', () => {
  beforeEach(() => {
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

  it('should render loading and transaction list correctly', async () => {
    render(<TransactionList />, { wrapper });

    // Initially should show loading state
    expect(screen.getByText('Loading transactions…')).toBeInTheDocument();

    expect(await screen.findByText(/txn_abc123def456/)).toBeInTheDocument();
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

    // Error should eventually appear
    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load transactions/i),
      ).toBeInTheDocument(),
    );
  });
});
