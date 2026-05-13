import { LayoutDashboard, Sparkles, Package, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AppLogo from '../ui/app-logo';
import LogoutButton from './logout-btn';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Experiences', icon: Sparkles, active: true },
  { label: 'Products', icon: Package },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
];

export default async function Sidebar() {
  const session = await auth.api.getSession({ headers: await headers() } );
  if (!session) {
     redirect("/login");
  }
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        {/* <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Choice Log</span>
        </div> */}
        <AppLogo href="/dashboard" textColor="text-gray-900" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                item.active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}