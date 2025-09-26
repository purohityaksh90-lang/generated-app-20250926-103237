import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, Category, TransactionStore } from '@/lib/types';
const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Groceries', color: '#FF6384' },
  { id: 'cat-2', name: 'Salary', color: '#36A2EB' },
  { id: 'cat-3', name: 'Utilities', color: '#FFCE56' },
  { id: 'cat-4', name: 'Transport', color: '#4BC0C0' },
  { id: 'cat-5', name: 'Entertainment', color: '#9966FF' },
  { id: 'cat-6', name: 'Health', color: '#FF9F40' },
  { id: 'cat-7', name: 'Shopping', color: '#C9CBCF' },
];
const initialTransactions: Transaction[] = [
    { id: uuidv4(), amount: 3500, date: new Date(new Date().setDate(1)).toISOString(), description: 'Monthly Salary', type: 'income', category: 'Salary' },
    { id: uuidv4(), amount: 150.75, date: new Date(new Date().setDate(2)).toISOString(), description: 'Weekly Groceries', type: 'expense', category: 'Groceries' },
    { id: uuidv4(), amount: 85.00, date: new Date(new Date().setDate(3)).toISOString(), description: 'Electricity Bill', type: 'expense', category: 'Utilities' },
    { id: uuidv4(), amount: 45.50, date: new Date(new Date().setDate(5)).toISOString(), description: 'Gas for Car', type: 'expense', category: 'Transport' },
    { id: uuidv4(), amount: 75.20, date: new Date(new Date().setDate(7)).toISOString(), description: 'Dinner with Friends', type: 'expense', category: 'Entertainment' },
    { id: uuidv4(), amount: 200.00, date: new Date(new Date().setDate(10)).toISOString(), description: 'New Jacket', type: 'expense', category: 'Shopping' },
];
export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      categories: initialCategories,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [{ ...transaction, id: uuidv4() }, ...state.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        })),
      updateTransaction: (updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updatedTransaction.id ? updatedTransaction : t
          ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: uuidv4() }],
        })),
      updateCategory: (updatedCategory) => {
        const oldCategory = get().categories.find(c => c.id === updatedCategory.id);
        if (!oldCategory) return;
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === updatedCategory.id ? updatedCategory : c
          ),
          transactions: state.transactions.map((t) =>
            t.category === oldCategory.name ? { ...t, category: updatedCategory.name } : t
          ),
        }));
      },
      deleteCategory: (id) => {
        const categoryToDelete = get().categories.find(c => c.id === id);
        if (!categoryToDelete) return;
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
          // Optional: Re-categorize transactions or handle them as needed.
          // Here we'll just leave them with the old category name string.
          // A more robust solution might move them to an "Uncategorized" category.
        }));
      }
    }),
    {
      name: 'clarity-expense-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);