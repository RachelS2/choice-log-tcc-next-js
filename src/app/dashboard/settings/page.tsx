"use client";
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, AlertCircle } from 'lucide-react';
import SecuritySection from '@/components/dashboard/settings/SecuritySection';
import ProfileSection from '@/components/dashboard/settings/ProfileSection';
import PersonalContextSection from '@/components/dashboard/settings/PersonalContextSection';

export interface UserProfile {
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    incomeRange: string;
}

const initialProfile: UserProfile = {
    name: 'Alex Smith',
    email: 'alex@company.com',
    image: null,
    emailVerified: false,
    incomeRange: 'PREFER_NOT_TO_SAY',
};

export default function ProfileSettings() {
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [savedProfile, setSavedProfile] = useState<UserProfile>(initialProfile);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const changed = JSON.stringify(profile) !== JSON.stringify(savedProfile);
        setHasChanges(changed);
    }, [profile, savedProfile]);

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);

    const handleSave = async () => {
        setSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSavedProfile({ ...profile });
        setSaving(false);
        toast.success('Profile updated successfully!');
    };

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile((prev) => ({ ...prev, ...updates }));
    };

    return (
        <div className="p-11 space-y-6 rounded-ful">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
                        Profile Settings
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Manage your personal information and account preferences.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 border border-amber-200">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Unsaved changes
                        </div>
                    )}
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges || saving}
                        className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Saving...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileSection
                    profile={profile}
                    updateProfile={updateProfile}
                />

                <PersonalContextSection
                    profile={profile}
                    updateProfile={updateProfile}
                />
            </div>
            {/* Profile Section
                <ProfileSection profile={profile} updateProfile={updateProfile} />

                {/* Personal Context Section */}
            {/* <PersonalContextSection profile={profile} updateProfile={updateProfile} /> */}

            {/* Security Section */}
            <SecuritySection />
        </div>
    );
}