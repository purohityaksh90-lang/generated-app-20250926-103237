import { useMemo } from 'react';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { useTransactionStore } from '@/lib/store';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
export function DashboardPage() {
  const transactions = useTransactionStore((state) => state.transactions);
  const { totalBalance, monthlyIncome, monthlyExpenses } = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    let balance = 0;
    let income = 0;
    let expenses = 0;
    transactions.forEach(t => {
      const transactionDate = new Date(t.date);
      const isThisMonth = isWithinInterval(transactionDate, { start: monthStart, end: monthEnd });
      if (t.type === 'income') {
        balance += t.amount;
        if (isThisMonth) income += t.amount;
      } else {
        balance -= t.amount;
        if (isThisMonth) expenses += t.amount;
      }
    });
    return {
      totalBalance: balance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
    };
  }, [transactions]);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-display font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={<DollarSign className="h-6 w-6 text-muted-foreground" />}
        />
        <StatsCard
          title="Monthly Income"
          value={formatCurrency(monthlyIncome)}
          icon={<ArrowUpCircle className="h-6 w-6 text-green-500" />}
          className="border-green-500/50"
        />
        <StatsCard
          title="Monthly Expenses"
          value={formatCurrency(monthlyExpenses)}
          icon={<ArrowDownCircle className="h-6 w-6 text-red-500" />}
          className="border-red-500/50"
        />
      </div>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CategoryChart />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}