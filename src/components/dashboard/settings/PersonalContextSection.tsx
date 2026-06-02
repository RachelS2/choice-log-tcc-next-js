import { useRef, useState } from 'react';
import { Camera, CheckCircle2, XCircle, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/app/dashboard/settings/page';

interface ProfileSectionProps {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
}

export default function ProfileSection({ profile, updateProfile }: ProfileSectionProps) {
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
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-950 mb-1">Informações Pessoais</h2>
            <p className="text-sm text-neutral-500 mb-6">
                Atualize sua foto de perfil e dados pessoais.
            </p>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-neutral-200 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
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
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Camera className="h-5 w-5 text-white" />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Alterar foto
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="profile-name" className="text-sm font-medium text-neutral-700">
                            Nome
                        </Label>
                        <Input
                            id="profile-name"
                            type="text"
                            placeholder="Seu nome completo"
                            value={profile.name}
                            onChange={(e) => updateProfile({ name: e.target.value })}
                            className="max-w-sm"
                        />
                        <p className="text-xs text-neutral-400">
                            Opcional — como você gostaria de ser chamado.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="profile-email" className="text-sm font-medium text-neutral-700">
                            Email
                        </Label>
                        <div className="flex items-center gap-3">
                            <div className="relative max-w-sm flex-1">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                <Input
                                    id="profile-email"
                                    type="email"
                                    value={profile.email}
                                    readOnly
                                    className="pl-9 bg-neutral-50 text-neutral-600 cursor-not-allowed"
                                />
                            </div>
                            {profile.emailVerified ? (
                                <Badge
                                    variant="secondary"
                                    className="bg-green-50 text-green-700 border-green-200 gap-1"
                                >
                                    <CheckCircle2 className="h-3 w-3" />
                                    Verificado
                                </Badge>
                            ) : (
                                <Badge
                                    variant="secondary"
                                    className="bg-amber-50 text-amber-700 border-amber-200 gap-1"
                                >
                                    <XCircle className="h-3 w-3" />
                                    Não verificado
                                </Badge>
                            )}
                        </div>
                        <p className="text-xs text-neutral-400">
                            O email não pode ser alterado diretamente. Entre em contato com o suporte se necessário.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}