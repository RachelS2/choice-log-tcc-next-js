import { useRef, useState } from 'react';
import { Camera, CheckCircle2, XCircle, Mail, User, TriangleAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { UserSettingsSchemaType } from '@/zod-schemas/user-settings';
import { UserAuthDTO } from '@/models/user';
import UserIcon from '@/components/ui/choicelog-user-icon';


interface ProfileSectionProps {
    isEditing: boolean;
    errors: FieldErrors<UserSettingsSchemaType>
    register: UseFormRegister<UserSettingsSchemaType>
    userData: UserAuthDTO
    setValue: UseFormSetValue<UserSettingsSchemaType>
}

export default function ProfileSection({ isEditing, errors, register, userData, setValue }: ProfileSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState(userData.image ?? "");
    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const url = URL.createObjectURL(file);

        setPreviewImage(url);

        setValue("image", url, {
            shouldDirty: true,
        });
    };

    return (

        <Card className="bg-white backdrop-blur-md border shadow-lg
border
border-blue-100
shadow-[0_2px_20px_rgba(59,130,246,0.05)]">

            {/* Header */}
            <CardHeader>
                <CardTitle className="text-lg text-neutral-950">
                    Informações Pessoais
                </CardTitle>
                <CardDescription className="text-sm text-neutral-500">
                    Atualize sua foto de perfil e seus dados pessoais.
                </CardDescription>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-start">

                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <UserIcon
                            name={userData.name}
                            image={previewImage}
                            className='h-28 w-28 text-2xl font-semibold'
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                            <Camera className="h-5 w-5 text-white" />
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="ghost"
                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        Alterar foto
                    </Button>

                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>

                {/* Form */}
                <div className="flex-1 space-y-5">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-neutral-700">
                            Nome
                        </Label>

                        <InputSection
                            id="username"
                            icon={User}
                            isEditing={isEditing}
                            register={register}
                            errors={errors}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Label>E-mail</Label>

                            </div>
                        </div>

                        <InputSection
                            id="email"
                            type="email"
                            icon={Mail}
                            isEditing={isEditing}
                            register={register}
                            errors={errors}
                        />
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}

type InputSectionProps = {
    id: "email" | "username";
    icon?: React.ComponentType<{ className?: string }>;
    type?: string;
    isEditing: boolean;
    register: UseFormRegister<UserSettingsSchemaType>;
    errors: FieldErrors<UserSettingsSchemaType>;
}


function InputSection({
    id,
    icon: Icon,
    type = "text",
    isEditing,
    register,
    errors
}: InputSectionProps) {
    return (
        <div className="w-full">
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                )}

                <Input
                    id={id}
                    type={type}
                    readOnly={!isEditing}
                    {...register(id)}
                    className={cn(
                        "pl-9 h-10 text-neutral-600 shadow-sm transition-all",
                        !isEditing
                            ? "bg-neutral-50 cursor-not-allowed"
                            : "bg-white",
                    )}
                />
            </div>

            {errors?.[id] && (
                <p className="mt-1 text-sm text-red-500">
                    {errors[id]?.message as string}
                </p>
            )}
        </div>
    );
}