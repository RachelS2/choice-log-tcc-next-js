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

export default function SecuritySection() {
    const [loggingOut, setLoggingOut] = useState(false);

    const handleChangePassword = () => {
        toast.info('Um email com instruções para redefinir sua senha foi enviado.');
    };

    const handleLogout = async () => {
        setLoggingOut(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        toast.success('Sessão encerrada com sucesso.');
        setLoggingOut(false);
    };

    const handleDeleteAccount = () => {
        toast.error('Conta excluída. Sentiremos sua falta.');
    };

    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-950 mb-1">Segurança</h2>
            <p className="text-sm text-neutral-500 mb-6">
                Gerencie sua senha e acesso à conta.
            </p>

            <div className="space-y-4">
                {/* Change Password */}
                <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <KeyRound className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900">Alterar senha</p>
                            <p className="text-xs text-neutral-500">
                                Enviaremos um link de redefinição para seu email.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleChangePassword}
                        className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                    >
                        Alterar
                    </Button>
                </div>

                {/* Logout */}
                <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                            <LogOut className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900">Sair da conta</p>
                            <p className="text-xs text-neutral-500">
                                Encerre sua sessão atual neste dispositivo.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                    >
                        {loggingOut ? 'Saindo...' : 'Sair'}
                    </Button>
                </div>

                <Separator className="my-2" />

                {/* Delete Account */}
                <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/30 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-red-900">Excluir conta</p>
                            <p className="text-xs text-red-600/70">
                                Esta ação é irreversível. Todos os seus dados serão apagados.
                            </p>
                        </div>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                            >
                                Excluir
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza que deseja excluir sua conta?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. Todos os seus dados, experiências registradas
                                    e insights serão permanentemente removidos dos nossos servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    Sim, excluir minha conta
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </section>
    );
}