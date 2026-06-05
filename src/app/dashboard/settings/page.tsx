"use client";
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, AlertCircle, PencilIcon } from 'lucide-react';
import SecuritySection from '@/components/dashboard/settings/security-section';
import ProfileSection from '@/components/dashboard/settings/profile-section';
import PersonalContextSection from '@/components/dashboard/settings/personal-context-section';
import { UserProfileViewDTO } from '@/models/user';
import { updateUserProfile } from '@/lib/repository/dashboard/user';
import { useGetUserProfile } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, SignUpSchemaType } from '@/zod-schemas/sign-up';
import { useForm } from 'react-hook-form';
import { AuthFormStateModel } from '@/models/auth/auth-form-state-model';


export default function ProfileSettings() {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
    });

    const userProfileData: {
        data: UserProfileViewDTO | null;
        loading: boolean;
        error: Error | null;
        reload: () => Promise<void>;
    } = useGetUserProfile();

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (userProfileData.data) {
            reset(userProfileData.data);
        }
    }, [userProfileData.data, reset]);

    useEffect(() => {
        if (userProfileData.error) {
            toast.error(
                "Failed to load user profile. Please try again later."
            );
        }
    }, [userProfileData.error]);

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    if (!userProfileData.data) {
        console.log("Profile is null, rendering loading state for settings");
        return;
    }
    if (userProfileData.error) {
        console.error("Error loading user profile:", userProfileData.error);
        return;
    }

    const handleSave = async () => {
        console.log("Saving profile:", formState);
        if (!formState) {
            setSaving(false);
            setIsEditing(false);
            return;
        }

        setSavedProfile({ ...formState });
        if (isDirty) {
            const result = await updateUserProfile(formState);
            router.refresh();
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
                console.log("Error to update user profile:", result.message);
            }
        }
        setIsEditing(false);
    };

    const updateProfile = (updates: Partial<UserProfileViewDTO>) => {
        setProfile((prev) => prev ? ({ ...prev, ...updates }) as UserProfileViewDTO : prev);
    };

    const onSubmitForm = async (data: UserProfileViewDTO) => {
        const result = await updateUserProfile(data);

        if (result.success) {
            toast.success(result.message);
            router.refresh();
            reset(data); // limpa o dirty state
            setIsEditing(false);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <form className="p-11 space-y-6 rounded-ful" onSubmit={handleSubmit(onSubmitForm)}>
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
                    {isDirty && (
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 border border-amber-200">
                            <AlertCircle className="h-7 w-3.5" />
                            Unsaved changes
                        </div>
                    )}
                    <Button
                        disabled={isSubmitting}
                        className="h-11 min-w-fit bg-blue-600 hover:bg-blue-700 text-white"
                        type="submit"
                    >
                        {isSubmitting && isDirty ? (
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
                    errors={errors}
                    register={register}
                />

                <PersonalContextSection
                    profile={profile ?? userProfileData.data}
                    updateProfile={updateProfile}
                    isEditing={isEditing}
                />
            </div>

            {/* Security Section */}
            <SecuritySection />
        </form>
    );
}