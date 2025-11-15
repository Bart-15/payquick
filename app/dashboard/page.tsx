import { Metadata } from 'next';

import TransactionList from '@/features/transactions/components/transaction-list';

export const metadata: Metadata = {
  title: 'PayQuick - Dashboard',
  description:
    'A mobile and web app that allows users to send and receive money securely.',
};

export default function DashboardPage() {
  return <TransactionList />;
}
