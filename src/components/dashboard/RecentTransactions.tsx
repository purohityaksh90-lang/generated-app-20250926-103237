import { useTransactionStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { EmptyState } from '@/components/ui/EmptyState';
import { ReceiptText } from 'lucide-react';
export function RecentTransactions() {
  const transactions = useTransactionStore((state) => state.transactions);
  const recentTransactions = transactions.slice(0, 5);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your last 5 transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <ul className="space-y-4">
              {recentTransactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">{t.description}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(t.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={cn(
                        'font-semibold text-lg',
                        t.type === 'income' ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </span>
                    <Badge variant="outline" className="mt-1">{t.category}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<ReceiptText className="h-12 w-12" />}
              title="No transactions yet"
              description="Add your first transaction to see it appear here."
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}