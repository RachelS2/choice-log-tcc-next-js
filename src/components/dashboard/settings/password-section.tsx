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

export default function PasswordSection() {
    return (
        <Card className="bg-white/80 backdrop-blur-md border-neutral-200 shadow-md">
            {/* Header */}
            <CardHeader>
                <CardTitle className="text-lg text-neutral-950">
                    Change Password
                </CardTitle>
                <CardDescription className="text-sm text-neutral-500">
                    Choose a strong password to keep your account safe.
                </CardDescription>
            </CardHeader>
            {/* Content */}
            <CardContent className="space-y-5">

                {/* Current Password */}
                <div className="space-y-2 w-full">
                    <Label
                        htmlFor="income-range"
                        className="text-sm font-medium text-neutral-700"
                    >
                        Current Password
                    </Label>
                </div>
            </CardContent>
        </Card>
    )

}