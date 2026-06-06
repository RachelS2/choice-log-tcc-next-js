import { useState } from 'react';
import { KeyRound, Loader2, LogOut, Trash2 } from 'lucide-react';
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
import { deleteUserAccount } from '@/lib/repository/dashboard/user';

export default function SecuritySection() {

    const router = useRouter();
    const handleChangePassword = () => {
        toast.info('An email with password reset instructions has been sent.');
    };

    const handleDeleteAccount = async () => {
        const loadingToast = toast.loading("Deleting account...");
        const result: {
            success: boolean;
            message: string;
        } = await deleteUserAccount();
        toast.dismiss(loadingToast);

        if (result.success) {
            const toastId = toast.success("Account deleted.");
            router.replace("/");
            toast.dismiss(toastId)
        } else {
            toast.error(result.message);
        }
    };
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-950 mb-1">Security</h2>
            <p className="text-sm text-neutral-500 mb-6">
                Manage your password and account access.
            </p>

            <div className="space-y-4">
                {/* Change Password */}
                <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <KeyRound className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900">Change password</p>
                            <p className="text-xs text-neutral-500">
                                We'll send a password reset link to your email.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleChangePassword}
                        className="w-24 h-9 border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                    >
                        Change
                    </Button>
                </div>

                {/* Logout */}
                <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                            <LogOut className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900">Log out</p>
                            <p className="text-xs text-neutral-500">
                                End your current session on this device.
                            </p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>

                {/* Delete Account */}
                <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/30 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-red-900">Delete account</p>
                            <p className="text-xs text-red-600/70">
                                This action is irreversible. All your data will be deleted.
                            </p>
                        </div>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-24 h-9 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. All your data, recorded experiences,
                                    and insights will be permanently removed from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    Yes, delete my account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </section>
    );
}