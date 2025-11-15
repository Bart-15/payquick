'use client';

import { format } from 'date-fns';
import { useEffect, useMemo, useRef } from 'react';

import { useTransactions } from '../hooks/useTransactions';
import { TransactionCard } from './transaction-card';

const TransactionList = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransactions();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // Flatten pages
  const items = useMemo(() => {
    return data?.pages.flatMap((page) => page?.data ?? []) ?? [];
  }, [data?.pages]);

  // Group transactions by month
  const groupedByMonth = useMemo(() => {
    const groups: Record<string, typeof items> = {};

    items.forEach((txn) => {
      const month = format(new Date(txn.created_at), 'MMMM yyyy');

      if (!groups[month]) groups[month] = [];
      groups[month].push(txn);
    });

    return groups;
  }, [items]);

  return (
    <section className="mx-auto my-4 max-w-5xl space-y-6 px-6">
      <h2 className="mb-4 text-4xl font-semibold">Transactions</h2>

      {/* --- Loading state --- */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading transactions…</p>
      )}

      {/* --- Error state --- */}
      {isError && (
        <p className="text-center text-red-500">Failed to load transactions</p>
      )}

      {/* --- Empty state --- */}
      {!isLoading && !isError && items.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}

      {/* --- Transactions grouped by month --- */}
      {Object.entries(groupedByMonth).map(([month, txns]) => (
        <div key={month} className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">{month}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {txns.map((txn) => (
              <TransactionCard
                key={txn.id}
                id={txn.id}
                type={txn.type}
                amount_in_cents={txn.amount_in_cents}
                currency={txn.currency}
                status={txn.status}
                destination_id={txn.destination_id}
                created_at={txn.created_at}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="flex h-10 items-center justify-center">
        {isFetchingNextPage && (
          <span className="text-sm text-gray-500">Loading more…</span>
        )}
      </div>
    </section>
  );
};

export default TransactionList;
