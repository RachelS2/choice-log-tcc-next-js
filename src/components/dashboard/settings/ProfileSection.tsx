import { useRef, useState } from 'react';
import { Camera, CheckCircle2, XCircle, Mail, User, TriangleAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/app/dashboard/settings/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileSectionProps {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
    isEditing: boolean;
}

export default function ProfileSection({ profile, updateProfile, isEditing }: ProfileSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(profile.image);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            updateProfile({ image: url });
        }
    };

    const getInitials = (name: string) => {
        return name
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
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-semibold text-white">
                                    {getInitials(profile.name || "U")}
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
                        className="text-xs text-blue-600 hover:bg-blue-50"
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
                            id="name"
                            icon={User}
                            value={profile.name}
                            onChange={(value) => updateProfile({ name: value })}
                            isEditing={isEditing}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Label>Email</Label>

                            </div>

                            {!profile.emailVerified && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                >
                                    <TriangleAlert />
                                    Verify E-mail
                                </Button>
                            )}
                        </div>

                        <InputSection
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(value) => updateProfile({ email: value })}
                            icon={Mail}
                            isEditing={isEditing}
                        />
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}

type InputSectionProps = {
    id: "email" | "name";
    value: string;
    onChange: (value: string) => void;
    icon?: React.ComponentType<{ className?: string }>;
    type?: string;
    isEditing: boolean;

};


function InputSection({
    id,
    value,
    onChange,
    icon,
    type = "text",
    isEditing,
}: InputSectionProps) {
    const Icon = icon;

    return (
        <div className="relative w-full">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            )}

            <Input
                id={id}
                type={type}
                value={value}
                readOnly={!isEditing}
                className={cn(
                    "pl-9 h-10 text-neutral-600 transition-all",
                    !isEditing
                        ? "bg-neutral-50 cursor-not-allowed"
                        : "bg-white",
                    "focus-visible:ring-2 focus-visible:ring-blue-500"
                )}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}