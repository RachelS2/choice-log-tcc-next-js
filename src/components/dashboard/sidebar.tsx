import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AppLogo from '../ui/app-logo';

import { SidebarNav } from './sidebarnav';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import UserIcon from '../ui/user-icon';
export default async function Sidebar() {

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex h-16 items-center border-b border-gray-200 bg-white px-6">
        <AppLogo
          href="/dashboard"
          textColor="text-gray-900"
        />
      </div>

      <SidebarNav />

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <UserIcon
            name={session.user.name}
            image={session.user.image}
            className="h-9 w-9"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="lg"
              className="h-9 w-9"
            >
              <Bell className="w-full text-gray-500" />
            </Button>

            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
              3
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}