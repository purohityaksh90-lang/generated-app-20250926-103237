export type Transaction = {
  id: string;
  amount: number;
  date: string; // ISO 8601 format
  description: string;
  type: 'income' | 'expense';
  category: string;
};
export type Category = {
  id: string;
  name: string;
  color: string;
};
export type TransactionStore = {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
};