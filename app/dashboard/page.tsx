import { Metadata } from 'next';

import TransactionList from '@/features/transactions/components/transaction-list';

export const metadata: Metadata = {
  title: 'Quick Pay - Dashboard',
  description: 'Quick Pay - Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="">
      <TransactionList />
    </div>
  );
}
