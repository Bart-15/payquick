import { render, screen } from '@testing-library/react';

import { useTransactions } from '../../hooks/useTransactions';
import TransactionList from '../transaction-list';

jest.mock('../../hooks/useTransactions', () => ({
  useTransactions: jest.fn(),
}));

jest.mock('../transaction-card', () => ({
  TransactionCard: ({ id }: { id: string }) => <div>MockCard {id}</div>,
}));

describe('TransactionList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    (useTransactions as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            data: [
              {
                id: '1',
                type: 'DEPOSIT',
                amount_in_cents: 10000,
                currency: 'USD',
                status: 'SUCCESS',
                destination_id: 'acc-001',
                created_at: '2024-01-05T10:00:00Z',
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    render(<TransactionList />);
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    (useTransactions as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<TransactionList />);
    expect(screen.getByText('Loading transactions…')).toBeInTheDocument();
  });

  it('should show error state', () => {
    (useTransactions as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<TransactionList />);

    expect(screen.getByText('Failed to load transactions')).toBeInTheDocument();
  });

  it('should show empty state when no transactions exist', () => {
    (useTransactions as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [] }] },
      isLoading: false,
      isError: false,
    });

    render(<TransactionList />);

    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
  });

  it('should show transactions grouped by month', () => {
    (useTransactions as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            data: [
              {
                id: '1',
                type: 'DEPOSIT',
                amount_in_cents: 10000,
                currency: 'USD',
                status: 'SUCCESS',
                destination_id: 'acc-001',
                created_at: '2024-01-05T10:00:00Z',
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    render(<TransactionList />);

    expect(screen.getByText('January 2024')).toBeInTheDocument();
    expect(screen.getByText('MockCard 1')).toBeInTheDocument();
  });
});
