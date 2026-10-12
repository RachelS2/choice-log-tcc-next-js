import { useState } from 'react';
import { KeyRound, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import LogoutButton from './logout-btn';
import { useRouter } from "next/navigation";
import { deleteUserAccount, updatePassword } from '@/lib/repository/user-repository';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChangePasswordFormSettings } from './change-password-form-settings';

export default function SecuritySection() {
    const router = useRouter();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const handleDeleteAccount = async () => {
        const loadingToast = toast.loading("Excluindo conta...");
        const result: {
            success: boolean;
            message: string;
        } = await deleteUserAccount();
        toast.dismiss(loadingToast);

        if (result.success) {
            toast.success("Conta excluída com sucesso.");
            router.replace("/");
        } else {
            toast.error(result.message);
        }
    };
    return (
        <Card className="bg-white backdrop-blur-md py-4 shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg text-neutral-950">
                    Segurança
                </CardTitle>

                <CardDescription>
                    Atualize sua senha e gerencie sua conta.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-4">

                {/* Password section */}
                <div className="space-y-4">

                    {/* Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <KeyRound className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="font-medium">Alterar senha</p>
                                <p className="text-sm text-neutral-500">
                                    Escolha uma senha forte para manter sua conta segura.
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="h-9 w-full bg-white/80 text-blue-500 shadow-md hover:text-blue-600 sm:w-24"
                        >
                            {showPasswordForm ? "Ocultar" : "Alterar"}
                        </Button>
                    </div>

                    {/* Expandable form */}
                    {showPasswordForm && (
                        <ChangePasswordFormSettings onCancel={() => setShowPasswordForm(false)} onPasswordChanged={() => setShowPasswordForm(false)} />
                    )}
                </div>

                <Separator />

                {/* Logout */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                            <LogOut className="h-4 w-4 text-neutral-600" />
                        </div>

                        <div className="min-w-0">
                            <p className="font-medium">Sair</p>
                            <p className="text-sm text-neutral-500">
                                Encerrar sua sessão atual neste dispositivo.
                            </p>
                        </div>
                    </div>

                    <div className="sm:ml-auto">
                        <LogoutButton />
                    </div>
                </div>

                <Separator />

                {/* Delete account */}
                <div className="flex flex-col gap-3 rounded-xl sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </div>

                        <div className="min-w-0">
                            <p className="font-medium">
                                Excluir conta
                            </p>
                            <p className="text-sm text-neutral-500">
                                Remover permanentemente sua conta e todos os dados associados.
                            </p>
                        </div>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-9 w-full bg-white/80 text-red-500 shadow-md hover:text-red-600 sm:w-24"
                            >
                                Excluir
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Excluir sua conta?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Excluir conta
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </CardContent>
        </Card>
    );
}

