import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTransactionStore } from '@/lib/store';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-card border rounded-lg shadow-lg">
        <p className="label font-bold text-lg">{`${label}`}</p>
        <p className="intro text-primary">{`Total: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};
export function CategoryChart() {
  const { transactions, categories } = useTransactionStore();
  const chartData = useMemo(() => {
    const expenseByCategory = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, transaction) => {
        const categoryName = transaction.category;
        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += transaction.amount;
        return acc;
      }, {} as Record<string, number>);
    return Object.entries(expenseByCategory)
      .map(([name, total]) => ({
        name,
        total,
        fill: categories.find((c) => c.name === name)?.color || '#8884d8',
      }))
      .sort((a, b) => b.total - a.total);
  }, [transactions, categories]);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>A breakdown of your expenses for the current period.</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))' }}
                  content={<CustomTooltip />}
                />
                <Legend iconSize={10} />
                <Bar dataKey="total" name="Total Spent" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[350px]">
              <EmptyState
                icon={<PieChart className="h-16 w-16" />}
                title="No Expense Data"
                description="Once you add some expenses, a beautiful chart of your spending by category will appear here."
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}