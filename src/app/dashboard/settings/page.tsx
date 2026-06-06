"use client";
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, AlertCircle, PencilIcon } from 'lucide-react';
import SecuritySection from '@/components/dashboard/settings/security-section';
import ProfileSection from '@/components/dashboard/settings/profile-section';
import PersonalContextSection from '@/components/dashboard/settings/personal-context-section';
import { UpdateUserProfileDTO, UserCompleteDTO } from '@/models/user';
import { updateUserProfile } from '@/lib/repository/dashboard/user';
import { useGetUserProfile } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { userSettingsSchema, UserSettingsSchemaType } from '@/zod-schemas/user-settings';


export default function ProfileSettings() {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<UserSettingsSchemaType>({
        resolver: zodResolver(userSettingsSchema),
        mode: "onChange",
        defaultValues: {
            incomeRange: "PREFER_NOT_TO_SAY",
        },
    });

    const userProfileData: {
        data: UserCompleteDTO | null;
        loading: boolean;
        error: Error | null;
        reload: () => Promise<void>;
    } = useGetUserProfile();

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (userProfileData.data) {
            reset({
                email: userProfileData.data.email,
                username: userProfileData.data.name,
                incomeRange: userProfileData.data.incomeRange,
                image: userProfileData.data.image ?? undefined,
            });
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


    if (userProfileData.loading) {
        return <div><p className="text-red-500">Loading...</p></div>;
    }

    if (userProfileData.error) {
        return <div><p className="text-red-500">Error loading profile</p></div>;
    }

    if (!userProfileData.data) {
        return <div><p className="text-red-500">No profile found</p></div>;
    }
    const onSubmit = async (data: UserSettingsSchemaType) => {
        console.log("SUBMIT FIRED");
        console.log(data)
        if (!userProfileData.data) {
            toast.error("User data is not available. Please try again later.");
            return;
        }
        const completeData: UpdateUserProfileDTO = {
            email: data.email,
            name: data.username,
            incomeRange: data.incomeRange,
            image: data.image,
        }
        console.log("Submitting profile update with data:", completeData);
        const result = await updateUserProfile(completeData);
        console.log("Is editing = ", isEditing);
        if (result.success) {
            toast.success(result.message);
            reset({
                email: data.email,
                username: data.username,
                incomeRange: data.incomeRange,
                image: data.image ?? undefined
            }); // limpa dirty state
            setIsEditing(false);
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };
    return (
        <form className="p-11 space-y-6 rounded-ful"
            onSubmit={(e) => {
                console.log("FORM SUBMIT EVENT");
                handleSubmit(onSubmit)(e);
            }}
        >
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
                    {isEditing ? (
                        <Button type="submit">
                            <Save className="h-4 w-4" />

                            Save Changes
                        </Button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                console.log("NATIVE BUTTON CLICK");
                                setIsEditing(true);
                            }}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileSection
                    setValue={setValue}
                    userData={userProfileData.data}
                    isEditing={isEditing}
                    errors={errors}
                    register={register}
                />

                <PersonalContextSection
                    isEditing={isEditing}
                    setValue={setValue}
                    watch={watch}
                />
            </div>

            {/* Security Section */}
            <SecuritySection />
        </form >
    );
}