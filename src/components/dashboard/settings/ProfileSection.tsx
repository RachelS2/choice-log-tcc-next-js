import { useRef, useState } from 'react';
import { Camera, CheckCircle2, XCircle, Mail, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/app/dashboard/settings/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileSectionProps {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
}

export default function ProfileSection({ profile, updateProfile }: ProfileSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(profile.image);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
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
        <section className="rounded-2xl bg-white/80 border border-neutral-200 p-6 shadow-md w-full">
            <h2 className="text-lg font-semibold text-neutral-950 mb-1">Personal Information</h2>
            <p className="text-sm text-neutral-500 mb-6">
                Update your profile photo and personal information.
            </p>

            <CardContent className="flex flex-col bg-white/80 gap-6 sm:flex-row sm:items-start">
                {/* Avatar Upload */}
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
                                    {getInitials(profile.name || 'U')}
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
                        className="text-xs bg-white font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-colors"
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

                {/* Form Fields */}
                <CardContent className="flex-1 bg-white/80 space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="profile-name" className="text-sm font-medium text-neutral-700">
                            Name
                        </Label>
                        <InputSection
                            id="name"
                            icon={User}
                            value={profile.name}
                            onChange={(value) => updateProfile({ name: value })}
                            isEditing={isEditingName}
                            onToggleEdit={() => setIsEditingName(prev => !prev)}
                        />

                        <div className="flex items-center gap-2"> 
                            <Label htmlFor="profile-email" className="mt-2 text-sm font-medium text-neutral-700"> 
                                Email 
                            </Label>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="mt-2 cursor-default">
                                            {profile.emailVerified ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-red-400" />
                                            )}
                                        </span>
                                    </TooltipTrigger>

                                    <TooltipContent className="bg-neutral-900 text-white text-xs rounded-md px-2 py-1">
                                        {profile.emailVerified ? "Verified" : "Not verified"}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <InputSection
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(value) => updateProfile({ email: value })}
                            icon={Mail}
                            isEditing={isEditingEmail}
                            onToggleEdit={() => setIsEditingEmail(prev => !prev)}
                            showVerify={!profile.emailVerified}
                        />
                    </div>
                </CardContent>
            </CardContent>
        </section>
    );
}

type InputSectionProps = {
    id: "email" | "name";
    value: string;
    onChange: (value: string) => void;
    icon?: React.ComponentType<{ className?: string }>;
    type?: string;
    isEditing: boolean;
    onToggleEdit: () => void;
    showVerify?: boolean;
};

function InputSection({
    id,
    value,
    onChange,
    icon,
    type = "text",
    isEditing,
    onToggleEdit,
    showVerify = false,
}: InputSectionProps) {

    if (id == "name" && showVerify) {
        throw new Error("'Name' field should not have verify option");
    }
    const Icon = icon;

    return (
        <div className="flex items-center gap-2">
            <div className="relative max-w-sm flex-1">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                )}

                <Input
                    id={id}
                    type={type}
                    value={value}
                    readOnly={!isEditing}
                    className={cn(
                        "pl-9 h-10 text-neutral-600",
                        !isEditing && "bg-neutral-50 cursor-not-allowed",
                        "focus-visible:ring-2 focus-visible:ring-blue-500"
                    )}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            <Button
                type="button"
                variant="ghost"
                className="h-10 min-w-20 px-4 bg-blue-600 text-white hover:bg-blue-700"
                onClick={onToggleEdit}
            >
                {isEditing ? "Save" : "Update"}
            </Button>

            {showVerify && (
                <Button className="h-10 px-4                       text-xs
                      border
                      border-blue-400
                      bg-white
                      text-blue-500
                      hover:bg-blue-100
                      hover:-translate-y-[1px]
                      hover:text-blue-700
                      shadow-[0_4px_12px_rgba(59,130,246,0.15)]
                      transition-all
                      duration-200">
                    Verify Email
                </Button>
            )}
        </div>
    );
}