import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AppLogo from '../ui/choicelog-app-logo';

import { SidebarNav } from './sidebarnav';

import UserIcon from '../ui/choicelog-user-icon';
export default async function Sidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <aside className="w-full border-b border-gray-200 bg-white lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:border-r lg:border-b-0 lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-gray-200 bg-white px-6 lg:border-b lg:border-gray-200">
        <AppLogo
          href="/dashboard"
          textColor="text-gray-900"
        />
      </div>

      <SidebarNav />

      <div className="border-t border-gray-200 p-4 lg:border-t">
        <div className="flex items-center gap-3">
          <UserIcon
            name={session.user.name}
            image={session.user.image}
            className="h-9 w-9"
          />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">{session.user.name}</p>
            <p className="truncate text-xs text-gray-500">{session.user.email}</p>
          </div>
          {/* <div className="relative">
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
          </div> */}
        </div>
      </div>
    </aside>
  );
}