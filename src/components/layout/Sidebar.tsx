import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Wallet, Shapes } from 'lucide-react';
import { cn } from '@/lib/utils';
const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ReceiptText },
  { href: '/categories', label: 'Categories', icon: Shapes },
];
export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r border-border fixed h-full">
      <div className="flex items-center h-16 px-6 border-b">
        <Wallet className="h-8 w-8 text-primary" />
        <h1 className="ml-3 text-2xl font-display font-bold">Clarity</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5 mr-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4 mt-auto text-sm text-center text-muted-foreground">
        <p>Built with ❤️ at Cloudflare</p>
      </div>
    </aside>
  );
}