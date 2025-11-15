import { render, screen } from '@testing-library/react';

import { TransactionCard } from '../transaction-card';

describe('TransactionCard', () => {
  it('should render correctly', () => {
    render(
      <TransactionCard
        id="1"
        type="DEPOSIT"
        amount_in_cents={1000}
        currency="USD"
        status="SUCCESS"
        destination_id="1"
        created_at="2025-11-15T12:00:00.000Z"
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('DEPOSIT')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('SUCCESS')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    // Use regex to match date format regardless of timezone
    expect(
      screen.getByText(/Nov 15, 2025, \d{1,2}:\d{2} [AP]M/),
    ).toBeInTheDocument();
  });

  it('should render correctly when amount in cents and currency has no value', () => {
    render(
      <TransactionCard
        id="1"
        type="WITHDRAWAL"
        status="SUCCESS"
        destination_id="1"
        created_at="2025-11-15T12:00:00.000Z"
      />,
    );
  });
});
