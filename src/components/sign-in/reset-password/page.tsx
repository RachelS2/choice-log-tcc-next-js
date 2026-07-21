"use client"
import Footer from '@/components/landing/footer';
import LandingHeaderClient from '@/components/landing/landing-header-client';
import { Label } from "@/components/ui/label";
import { changePasswordSchema, ChangePasswordSchemaType, resetPasswordSchema, ResetPasswordSchemaType } from "@/zod-schemas/user-settings";
import {
    FieldValues, DefaultValues, Path, useForm, UseFormRegister
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from 'lucide-react';
import { useSearchParams } from "next/navigation";
import PasswordInput from '../password-input';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type PasswordInputType = {
    label: "New password" | "Confirm Password";
    register: UseFormRegister<ResetPasswordSchemaType>;
    name: Path<ResetPasswordSchemaType>;
    error?: string
}
function CreatePasswordInput({
    label,
    register,
    name,
    error
}: PasswordInputType) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                <Lock className="h-4 w-4 text-neutral-500" />

                <Label htmlFor="password" className="text-lg">
                    {label}
                </Label>
            </div>
            <PasswordInput
                register={register}
                name={name}
                className="border bg-white/80 shadow-sm"
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}

export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",

    });
    const handleChangePassword = async (data: ResetPasswordSchemaType) => {
        const loadingToast = toast.loading("Updating password...");
        //const result = await putNewPassword(data);
        console.log("Resetting password with data:", data);
        toast.dismiss(loadingToast);

        // if (result.success) {
        //     toast.success("Password updated successfully.");
        //     onPasswordChanged?.()
        // } else {
        //     toast.error(result.message);
        // }
    };
    return (
        <Card className="bg-white p-8 shadow-sm rounded-xl">
            <CardHeader className=' text-center'>
                <CardTitle className='text-2xl'>Reset Password</CardTitle>
                <CardDescription className='text-sm'>Set a new password for your ChoiceLog account</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(handleChangePassword)} className="w-full max-w-md">
                <div
                    className="space-y-6"
                >

                    <CreatePasswordInput
                        error={errors.newPassword?.message}
                        name="newPassword"
                        register={register}
                        label="New password"
                    />

                    <CreatePasswordInput
                        error={errors.confirmPassword?.message}
                        name="confirmPassword"
                        register={register}
                        label="Confirm Password"
                    />
                </div>

                <div className="flex justify-center pt-6 gap-2">
                    <Button
                        type="submit"
                        disabled={
                            !isDirty ||
                            isSubmitting ||
                            Object.keys(errors).length > 0
                        }
                        className="bg-blue-600 w-full h-9 hover:bg-blue-500 shadow-lg"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}