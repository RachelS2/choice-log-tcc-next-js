"use client";
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, AlertCircle, PencilIcon } from 'lucide-react';
import SecuritySection from '@/components/dashboard/settings/SecuritySection';
import ProfileSection from '@/components/dashboard/settings/ProfileSection';
import PersonalContextSection from '@/components/dashboard/settings/PersonalContextSection';
import { UserProfileViewDTO } from '@/models/user';
import { fetchUserProfile, updateUserProfile } from '@/lib/repository/dashboard/user';
import { useGetUserProfile } from '@/hooks/use-user';


export default function ProfileSettings() {
    const userProfileData: {
        data: UserProfileViewDTO | null;
        loading: boolean;
        error: Error | null;
        reload: () => Promise<void>;
    } = useGetUserProfile();
    let [profile, setProfile] = useState<UserProfileViewDTO | null>(null);
    const [savedProfile, setSavedProfile] = useState<UserProfileViewDTO | null>(null);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (userProfileData.data) {
            setProfile(userProfileData.data);
            setSavedProfile(userProfileData.data);
        }
    }, [userProfileData.data]);

    useEffect(() => {
        if (userProfileData.error) {
            toast.error(
                "Failed to load user profile. Please try again later."
            );
        }
    }, [userProfileData.error]);

    // Detects if the user changed anything in the form by comparing the current profile with the saved profile
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

    if (!userProfileData.data) {
        console.log("Profile is null, rendering loading state for settings");
        return;
    }
    if (userProfileData.error) {
        console.error("Error loading user profile:", userProfileData.error);
        return;
    }


    const handleSave = async () => {
        console.log("Saving profile:", profile);
        setSaving(true);
        if (!profile) {
            setSaving(false);
            setIsEditing(false);
            setHasChanges(false);
            return;
        }

        setSavedProfile({ ...profile });
        const result = await updateUserProfile(profile);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
            console.log("Error to update user profile:", result.message);
        }
        setSaving(false);
        setIsEditing(false);
        if (hasChanges) {
            toast.success('Profile updated successfully!');
        }
        setHasChanges(false);

    };

    const updateProfile = (updates: Partial<UserProfileViewDTO>) => {
        setProfile((prev) => prev ? ({ ...prev, ...updates }) as UserProfileViewDTO : prev);
    };

    return (
        <div className="p-11 space-y-6 rounded-ful">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
                        Profile Settings
                    </h1>
                    <p className="mt-1 text-md text-neutral-500">
                        Manage your personal information and account preferences.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 border border-amber-200">
                            <AlertCircle className="h-7 w-3.5" />
                            Unsaved changes
                        </div>
                    )}
                    <Button
                        onClick={() => {
                            if (isEditing) {
                                handleSave();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                        disabled={saving}
                        className="h-11 min-w-fit bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {saving && hasChanges ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Saving...
                            </span>
                        ) :

                            isEditing ?
                                (
                                    <span className="flex items-center gap-2">
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </span>
                                )
                                :
                                (
                                    <span className="flex items-center gap-2">
                                        <PencilIcon className="h-4 w-4" />
                                        Edit Profile
                                    </span>
                                )

                        }
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileSection
                    profile={profile ?? userProfileData.data}
                    updateProfile={updateProfile}
                    isEditing={isEditing}
                />

                <PersonalContextSection
                    profile={profile ?? userProfileData.data}
                    updateProfile={updateProfile}
                    isEditing={isEditing}
                />
            </div>

            {/* Security Section */}
            <SecuritySection />
        </div>
    );
}