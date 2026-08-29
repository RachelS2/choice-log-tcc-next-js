"use client"
import { Label } from "@/components/ui/label";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/zod-schemas/user-settings";
import {
    Path, useForm, UseFormRegister
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from 'lucide-react';
import { redirect, useSearchParams } from "next/navigation";
import PasswordInput from '../password-input';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from "next/navigation";
import { resetPassword } from '@/lib/repository/user-repository';

type PasswordInputType = {
    label: "Nova senha" | "Confirmar senha";
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
    const token = searchParams.get("token");
    const router = useRouter()
    if (error === "INVALID_TOKEN" || !token) {
        redirect("/sign-in/forgot-password");
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",

    });
    const handleChangePassword = async (data: ResetPasswordSchemaType) => {
        const loadingToast = toast.loading("Redefinindo senha...");
        const result = await resetPassword(data, token);
        console.log("Resetting password with data:", data);
        toast.dismiss(loadingToast);

        if (result.success == true) {
            toast.success("Senha atualizada com sucesso.\nFaça login para acessar sua conta.");
            router.push("/sign-in");
        } else {
            toast.error(result.message);
        }
    };
    return (
        <Card className="bg-white p-8 shadow-sm rounded-xl">
            <CardHeader className=' text-center'>
                <CardTitle className='text-2xl'>Redefinir senha</CardTitle>
                <CardDescription className='text-sm'>Defina uma nova senha para sua conta do ChoiceLog</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(handleChangePassword)} className="w-full max-w-md">
                <div
                    className="space-y-6"
                >

                    <CreatePasswordInput
                        error={errors.newPassword?.message}
                        name="newPassword"
                        register={register}
                        label="Nova senha"
                    />

                    <CreatePasswordInput
                        error={errors.confirmPassword?.message}
                        name="confirmPassword"
                        register={register}
                        label="Confirmar senha"
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
                        {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}