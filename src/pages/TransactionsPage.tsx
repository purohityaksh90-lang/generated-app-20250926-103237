import { useState, useMemo } from 'react';
import { TransactionsDataTable } from '@/components/transactions/TransactionsDataTable';
import { TransactionFilters, Filters } from '@/components/transactions/TransactionFilters';
import { useTransactionStore } from '@/lib/store';
import { isWithinInterval, parseISO } from 'date-fns';
export function TransactionsPage() {
  const allTransactions = useTransactionStore((state) => state.transactions);
  const [filters, setFilters] = useState<Filters>({
    description: '',
    type: 'all',
    category: 'all',
    dateRange: undefined,
  });
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((transaction) => {
      // Description filter
      if (
        filters.description &&
        !transaction.description.toLowerCase().includes(filters.description.toLowerCase())
      ) {
        return false;
      }
      // Type filter
      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false;
      }
      // Category filter
      if (filters.category !== 'all' && transaction.category !== filters.category) {
        return false;
      }
      // Date range filter
      if (filters.dateRange?.from) {
        const transactionDate = parseISO(transaction.date);
        const toDate = filters.dateRange.to || filters.dateRange.from;
        if (!isWithinInterval(transactionDate, { start: filters.dateRange.from, end: toDate })) {
          return false;
        }
      }
      return true;
    });
  }, [allTransactions, filters]);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold">All Transactions</h1>
        <p className="text-lg text-muted-foreground mt-2">
          View, search, and filter all your recorded income and expenses.
        </p>
      </div>
      <TransactionFilters filters={filters} onFiltersChange={setFilters} />
      <TransactionsDataTable transactions={filteredTransactions} />
    </div>
  );
}