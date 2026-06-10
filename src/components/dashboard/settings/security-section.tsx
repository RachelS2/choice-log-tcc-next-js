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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SecuritySection() {

    const router = useRouter();
    const handleChangePassword = () => {
        toast.info('An email with password reset instructions has been sent.');
    };
    const [showPasswordForm, setShowPasswordForm] = useState(false);
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
        <Card className="bg-white/80 backdrop-blur-md border shadow-lg
border
border-blue-100
shadow-[0_2px_20px_rgba(59,130,246,0.05)]">
            <CardHeader>
                <CardTitle className="text-lg text-neutral-950">
                    Security
                </CardTitle>

                <CardDescription>
                    Update your password and manage your account.
                </CardDescription>
            </CardHeader>


            <CardContent className="space-y-5">

                {/* Password section */}
                <div className="space-y-4">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <KeyRound className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="font-medium">Change password</p>
                                <p className="text-sm text-neutral-500">
                                    Choose a strong password to keep your account secure.
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowPasswordForm((v) => !v)}
                            className="w-24 h-9 text-blue-500 bg-white/80 shadow-md hover:text-blue-600"
                        >
                            {showPasswordForm ? "Hide" : "Change"}
                        </Button>
                    </div>

                    {/* Expandable form */}
                    {showPasswordForm && (
                        <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 text-blue-800">
                                    <Label>Current password</Label>
                                    <Input type="password" />
                                </div>

                                <div className="space-y-2 text-blue-800">
                                    <Label>New password</Label>
                                    <Input type="password" />
                                </div>

                                <div className="space-y-2 text-blue-800">
                                    <Label>Confirm password</Label>
                                    <Input type="password" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-3 gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowPasswordForm(false)}
                                >
                                    Cancel
                                </Button>

                                <Button type="button" className="bg-blue-600 hover:bg-blue-500 shadow-lg">
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <Separator />

                {/* Logout */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                            <LogOut className="h-4 w-4 text-neutral-600" />
                        </div>

                        <div>
                            <p className="font-medium">Log out</p>
                            <p className="text-sm text-neutral-500">
                                End your current session on this device.
                            </p>
                        </div>
                    </div>

                    <LogoutButton />
                </div>

                <Separator />

                {/* Delete account */}
                <div className="flex items-center justify-between rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </div>

                        <div>
                            <p className="font-medium">
                                Delete account
                            </p>
                            <p className="text-sm text-neutral-500">
                                Permanently remove your account and all associated data.
                            </p>
                        </div>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-24 h-9 text-red-500 bg-white/80 shadow-md hover:text-red-600"
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Delete your account?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    This action cannot be undone. All your data will be permanently removed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </CardContent>
        </Card>
    );
}