import { useGetUserProfile } from "@/hooks/use-user";
import { updateUserProfile } from "@/lib/repository/user-repository";
import { UpdateUserProfileDTO, UserCompleteDTO } from "@/models/user";
import { userSettingsSchema, UserSettingsSchemaType } from "@/zod-schemas/user-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, PencilIcon, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PersonalContextSection from "./personal-context-section";
import ProfileSection from "./profile-section";
import { Button } from "@/components/ui/button";
import PersonalProfileSectionSkeleton from "./personal-profile-section-skeleton";
import ProfileSettingsHeader from "./header";

export default function PersonalProfileSection() {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,

        formState: { errors, isDirty }
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
                incomeRange: userProfileData.data.incomeRange ?? "PREFER_NOT_TO_SAY",
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
        return <PersonalProfileSectionSkeleton />;
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
        const updatingToast = toast.warning("Updating profile...")
        const completeData: UpdateUserProfileDTO = {
            email: data.email,
            name: data.username,
            incomeRange: data.incomeRange,
            image: data.image,
        }
        const result = await updateUserProfile(completeData);
        console.log("Profile updated...")
        toast.dismiss(updatingToast);
        if (result.success) {
            toast.success(result.message);
            reset({
                email: data.email,
                username: data.username,
                incomeRange: data.incomeRange,
                image: data.image ?? undefined
            }); // limpa dirty state

            router.refresh();
        } else {
            toast.error(result.message);
            reset({
                email: userProfileData.data.email,
                username: userProfileData.data.name,
                incomeRange: userProfileData.data.incomeRange,
                image: userProfileData.data.image ?? undefined
            }); // limpa dirty state
        }
        setIsEditing(false);
    };
    const handleCancel = () => {
        if (!userProfileData.data) return;

        reset({
            email: userProfileData.data.email,
            username: userProfileData.data.name,
            incomeRange: userProfileData.data.incomeRange,
            image: userProfileData.data.image ?? undefined,
        });

        setIsEditing(false);
    };

    return (
        <form className="rounded-full"
            onSubmit={handleSubmit(
                onSubmit,

            )}
        >
            {/* Page Header */}
            <div className="flex items-center justify-between pb-4">
                <ProfileSettingsHeader />
                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            {isDirty && (
                                <div className="
            flex items-center gap-2
            h-11 px-3
            rounded-lg
            border border-amber-200
            bg-amber-50
            text-amber-700
            text-sm
            font-medium
        ">
                                    <AlertCircle className="h-4 w-4" />
                                    Unsaved changes
                                </div>
                            )}
                            <Button type="submit" className="h-11 bg-blue-600  shadow-xl hover:bg-blue-700 text-white">
                                <span className="flex items-center gap-2 text-md ">
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </span>
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleCancel}
                                className="h-11 shadow-xl border border-neutral-300 bg-white text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                            >

                                <X className="h-4 w-4" />
                                Cancel
                            </Button>

                        </div>
                    ) : (
                        <button
                            type="button"
                            className="
inline-flex items-center justify-center gap-2
h-11 px-4
rounded-lg
bg-blue-600 text-white
hover:bg-blue-700
font-medium text-sm
transition-all
cursor-pointer
shadow-xl
"
                            onClick={() => {
                                console.log("NATIVE BUTTON CLICK");
                                setIsEditing(true);
                            }}
                        >
                            <span className="flex items-center gap-2 ">
                                <PencilIcon className="h-4 w-4" />
                                Edit Profile
                            </span>
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
        </form>
    );
}