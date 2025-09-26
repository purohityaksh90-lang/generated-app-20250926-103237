import { Button } from '@/components/ui/button';
import { CategoryDialog } from '@/components/categories/CategoryDialog';
import { CategoryList } from '@/components/categories/CategoryList';
import { PlusCircle } from 'lucide-react';

export function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold">Categories</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage your spending categories to keep your transactions organized.
          </p>
        </div>
        <CategoryDialog
          trigger={
            <Button className="flex items-center gap-2 font-semibold">
              <PlusCircle className="h-5 w-5" />
              Add Category
            </Button>
          }
        />
      </div>
      <CategoryList />
    </div>
  );
}