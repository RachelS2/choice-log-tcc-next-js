import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AppLogo from '../ui/app-logo';
import LogoutButton from './logout-btn';

import { SidebarNav } from './sidebarnav';
export default async function Sidebar() {
  const session = await auth.api.getSession({ headers: await headers() } );
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