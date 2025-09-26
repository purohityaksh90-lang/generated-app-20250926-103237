import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { MobileNav } from './MobileNav';
export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <MobileNav />
        {/* Can add breadcrumbs or page title here later */}
      </div>
      <div className="flex items-center gap-4">
        <AddTransactionDialog />
      </div>
    </header>
  );
}