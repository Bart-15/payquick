'use client';

import { useEffect, useRef } from 'react';

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

  // Flatten pages safely
  const items = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

  return (
    <section className="mx-auto my-4 max-w-5xl space-y-4 px-6">
      <h2 className="mb-4 text-lg font-semibold">Transactions</h2>

      {/* --- Loading state --- */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading transactions…</p>
      )}

      {/* --- Error state --- */}
      {isError && (
        <p className="text-center text-red-500">
          Failed to load transactions: {error?.message}
        </p>
      )}

      {/* --- Empty state --- */}
      {!isLoading && !isError && items.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}

      {/* --- Transactions list --- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((txn) => (
          <TransactionCard key={txn.id} txn={txn} />
        ))}
      </div>

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
