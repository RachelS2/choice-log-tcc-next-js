import { useRef, useState } from 'react';
import { Camera, CheckCircle2, XCircle, Mail, User, TriangleAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getUserAuthData } from '@/lib/utils';

import { FieldErrors, useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { UserSettingsSchemaType } from '@/zod-schemas/user-settings';
import { UserAuthDTO } from '@/models/user';
import { IncomeRange } from '../../../../generated/prisma';


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

    const getInitials = (username: string) => {
        return username
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (

        <Card className="w-full bg-white/80 backdrop-blur-md border-neutral-200 shadow-md">

            {/* Header */}
            <CardHeader>
                <CardTitle className="text-lg text-neutral-950">
                    Personal Information
                </CardTitle>
                <CardDescription className="text-sm text-neutral-500">
                    Update your profile photo and personal information.
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
                        <div className="h-28 w-28 shadow-md ring-4 ring-white rounded-full overflow-hidden border-2 border-neutral-200 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span>
                                    {getInitials(userData.name)}
                                </span>
                            )}
                        </div>

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
                        Change photo
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
                            Name
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
                                <Label>Email</Label>

                            </div>

                            {!userData?.emailVerified && (
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 bg-white border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                                >
                                    <TriangleAlert />
                                    Verify E-mail
                                </Button>
                            )}
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
        <div className="relative w-full">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            )}

            <Input
                id={id}
                type={type}
                readOnly={!isEditing}
                {...register(id)}
                className={cn(
                    "pl-9 h-10 text-neutral-600 transition-all",
                    !isEditing ? "bg-neutral-50 cursor-not-allowed" : "bg-white",
                    "focus-visible:ring-2 focus-visible:ring-blue-500"
                )}
            />

            {errors?.[id] && (
                <p className="text-sm text-red-500">
                    {errors[id]?.message as string}
                </p>
            )}
        </div>
    );
}