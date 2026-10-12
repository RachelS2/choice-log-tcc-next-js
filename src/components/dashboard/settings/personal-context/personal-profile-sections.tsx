import { useGetUserProfile } from "@/hooks/use-user";
import { updateUserProfile } from "@/lib/repository/user-repository";
import { UpdateUserProfileDTO, UserCompleteDTO } from "@/models/user";
import { userSettingsSchema, UserSettingsSchemaType } from "@/zod-schemas/user-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PersonalContextSection from "./personal-context-section";
import ProfileSection from "./profile-section";
import { Button } from "@/components/ui/button";
import PersonalProfileSectionSkeleton from "./personal-profile-section-skeleton";
import ProfileSettingsHeader from "./header";
import Modal from "@/components/ui/choicelog-modal";
import { authClient } from "@/lib/auth-client";

export default function PersonalProfileSection() {
    const [sendEmailChangedVerification, setSendEmailChangedVerification] = useState(false);
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
                "Falha ao carregar o perfil do usuário. Tente novamente mais tarde."
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
        return <div><p className="text-red-500">Erro ao carregar perfil</p></div>;
    }

    if (!userProfileData.data) {
        return <div><p className="text-red-500">Perfil não encontrado</p></div>;
    }
    const onSubmit = async (newData: UserSettingsSchemaType) => {
        if (!userProfileData.data) {
            toast.error("Os dados do usuário não estão disponíveis.");
            return;
        }

        const updatingToast = toast.loading("Salvando alterações...");

        const currentData = userProfileData.data;

        const emailChanged = (
            newData.email.trim().toLowerCase() !==
            currentData.email.trim().toLowerCase()
        );

        const completeData: UpdateUserProfileDTO = {
            name: newData.username,
            incomeRange: newData.incomeRange,
            image: newData.image,
        };

        try {
            const result = await updateUserProfile(completeData);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            let emailVerificationSent = false;

            if (emailChanged) {
                const { error } = await authClient.changeEmail({
                    newEmail: newData.email.trim(),
                    callbackURL: "/dashboard/settings",
                });

                if (error) {
                    toast.error(
                        error.message ??
                        "Não foi possível solicitar a alteração de e-mail."
                    );
                } else {
                    emailVerificationSent = true;
                }
            }

            reset({
                email: currentData.email,
                username: newData.username,
                incomeRange: newData.incomeRange,
                image: newData.image ?? undefined,
            });

            setIsEditing(false);

            router.refresh();

            if (emailVerificationSent) {
                setSendEmailChangedVerification(true);
            } else if (!emailChanged) {
                toast.success(result.message);
            } else {
                toast.warning(
                    "Perfil atualizado, mas a alteração de e-mail não foi solicitada."
                );
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);

            toast.error(
                "Ocorreu um erro inesperado ao salvar as alterações."
            );
        } finally {
            toast.dismiss(updatingToast);
        }
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
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">

                                {isDirty ? (
                                    <Button type="submit" className="h-11 w-full bg-blue-600 text-white shadow-sm hover:bg-blue-700 sm:w-auto">
                                        <span className="flex items-center gap-2 text-sm sm:text-base">
                                            <Save className="h-4 w-4" />
                                            Salvar alterações
                                        </span>
                                    </Button>) : null}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="h-11 w-full bg-white/80 text-blue-500 shadow-sm hover:text-blue-600 sm:w-auto"
                                >

                                    <X className="h-4 w-4" />
                                    Cancelar
                                </Button>

                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="
inline-flex items-center justify-center gap-2
h-11 px-4 w-full
rounded-lg
bg-blue-600 text-white
hover:bg-blue-700
font-medium text-sm
transition-all
cursor-pointer
shadow-xl
sm:w-auto
"
                            onClick={() => {
                                setIsEditing(true);
                            }}
                        >
                            <span className="flex items-center gap-2 ">
                                <PencilIcon className="h-4 w-4" />
                                Editar perfil
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
            <Modal
                buttonText="Entendi"
                dialogTitle="Confirme a alteração de e-mail"
                dialogDescription="Enviamos um link de confirmação para seu endereço de e-mail atual. Acesse sua caixa de entrada para autorizar a alteração. Seu e-mail permanecerá o mesmo até que o processo seja concluído."
                open={sendEmailChangedVerification}
                onOpenChange={setSendEmailChangedVerification}
                confirmButtonClassName="bg-blue-600 hover:bg-blue-700"
                onConfirm={async () => setSendEmailChangedVerification(false)}
            />
        </form>
    );
}