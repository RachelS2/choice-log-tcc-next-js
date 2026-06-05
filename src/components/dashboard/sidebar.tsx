"use client"
import AppLogo from '../ui/app-logo';
import { Bell } from 'lucide-react';

import { SidebarNav } from './sidebarnav';
import { Button } from '../ui/button';
import { UserProfileViewDTO } from '@/models/user';
import { useGetUserProfile } from '@/hooks/use-user';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Sidebar() {
  const userProfileData: {
    data: UserProfileViewDTO | null;
    loading: boolean;
    error: Error | null;
    reload: () => Promise<void>;
  } = useGetUserProfile();

  let [user, setProfile] = useState<UserProfileViewDTO | null>(null);
  
  useEffect(() => {
    if (userProfileData.data) {
      setProfile(userProfileData.data);
    }
  }, [userProfileData.data]);

  useEffect(() => {
    if (userProfileData.error) {
      toast.error(
        "Failed to load user profile. Please try again later."
      );
    }
  }, [userProfileData.error]);

  if (!userProfileData.data) {
    console.log("Profile is null, rendering loading state for settings");
    return;
  }
  if (userProfileData.error) {
    console.error("Error loading user profile:", userProfileData.error);
    return;
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
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
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