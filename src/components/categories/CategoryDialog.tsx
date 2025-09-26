import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransactionStore } from '@/lib/store';
import { Category } from '@/lib/types';
import { toast } from '@/components/ui/sonner';
const formSchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters.' }),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: 'Must be a valid hex color code (e.g., #RRGGBB).' }),
});
type CategoryFormValues = z.infer<typeof formSchema>;
interface CategoryDialogProps {
  category?: Category;
  trigger: React.ReactNode;
  onClose?: () => void;
}
export function CategoryDialog({ category, trigger, onClose }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const { addCategory, updateCategory } = useTransactionStore();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
      color: category?.color || '#FF6384',
    },
  });
  useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name || '',
        color: category?.color || '#FF6384',
      });
    }
  }, [open, category, form]);
  const onSubmit = (values: CategoryFormValues) => {
    if (category) {
      updateCategory({ ...category, ...values });
      toast.success('Category updated successfully!');
    } else {
      addCategory(values);
      toast.success('Category added successfully!');
    }
    setOpen(false);
    if (onClose) onClose();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {category ? 'Update the details for this category.' : 'Create a new category to organize your transactions.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input type="color" className="w-12 h-10 p-1" {...field} />
                      <Input placeholder="#FF6384" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{category ? 'Save Changes' : 'Create Category'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}