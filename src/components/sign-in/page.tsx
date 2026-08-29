'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { AuthFormStateModel } from '@/models/auth/auth-form-state-model';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import PasswordInput from './password-input';
import { ArrowRightIcon, Lock, Loader2 } from 'lucide-react';
import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { loginSchema, LoginSchemaType } from '@/zod-schemas/sign-in-schema';
import { Info } from 'lucide-react';

export default function LoginForm() {
    const initialState: AuthFormStateModel = { message: null, errors: {} };
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: initialState?.fields_values?.email ?? "",
            password: initialState?.fields_values?.password ?? "",
        },
    });

    async function handleResendVerificationEmail() {
        console.log("Resending verification email to: " + userEmail);
        setIsResendingEmail(true);
        await authClient.sendVerificationEmail({
            email: userEmail,
        }, {
            onSuccess: () => {
                router.replace("/sign-in");
                setEmailVerified(true); // to hide the button after resending the verification email
                toast.warning("E-mail de verificação enviado.", { description: "Verifique sua caixa de entrada e confirme seu e-mail antes de entrar." })
            },
            onError: (ctx) => {

                toast.error("Falha ao enviar o e-mail de verificação.", { description: ctx.error.message });
                setEmailVerified(false);
            }
        });
        setIsResendingEmail(false);
    }
    async function handleOnSubmit(loginData: LoginSchemaType) {
        setIsSubmitting(true);
        await authClient.signIn.email({
            email: loginData.email,
            password: loginData.password,
            rememberMe: rememberMe,
        }
            , {
                onSuccess: () => {
                    router.replace("/dashboard");
                },
                onError: (ctx) => {

                    if (ctx.error.status === 401) {
                        toast.warning("Credenciais inválidas.", { description: "Verifique seu e-mail e senha e tente novamente." })
                    }
                    else {
                        console.log("Error during login: " + ctx.error.status);
                        if (ctx.error.message == 'Email not verified') {
                            setUserEmail(loginData.email);
                            toast.error("E-mail não verificado.", { description: "Verifique seu e-mail antes de entrar." });
                            setEmailVerified(false);
                        }
                        else {
                            toast.error("Ocorreu um erro durante o login.", { description: ctx.error.message })
                        }
                    }
                }
            });
        setIsSubmitting(false);
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [emailVerified, setEmailVerified] = useState(true);
    const [isResendingEmail, setIsResendingEmail] = useState(false);
    // rememberMe falso = sessão acaba ao fechar navegador, true = sessão persiste por 7 dias ou até o usuário deslogar manualmente
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col items-start w-full max-w-md min-h-[calc(100vh-96px)] justify-center p-10">
            <Card className='w-full max-w-md rounded-3xl shadow-xl border-neutral-200'>
                <CardHeader className=' text-center'>
                    <CardTitle className='text-3xl'>Entrar</CardTitle>
                    <CardDescription className='text-xl'>Acesse sua conta</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <AtSymbolIcon className="h-4 w-4 text-neutral-500" />

                            <Label htmlFor='email' className="text-lg">E-mail</Label>
                        </div>

                        <Input id='email' type='email' placeholder='your_email@example.com' {...register('email')} className="!text-base" />
                        <p className="text-red-600 text-base min-h-[1rem]">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <Lock className="h-4 w-4 text-neutral-500" />

                            <Label htmlFor="password" className="text-lg">
                                Senha
                            </Label>
                        </div>

                        <PasswordInput register={register} name={'password'} />
                        <p className="text-red-600 text-base min-h-[1rem]">
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                        <div className='flex items-center gap-2'>
                            <Checkbox id='remember' checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                            <Label htmlFor='remember'>Lembrar de mim</Label>
                        </div>
                        <Link href='/sign-in/forgot-password' className='text-blue-600 hover:underline'>
                            Esqueci minha senha
                        </Link>
                    </div>
                    <Button className='w-full h-11 text-base bg-blue-500 hover:bg-blue-700' type="submit" disabled={isSubmitting}>
                        {isSubmitting ?
                            (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Entrando...</span>
                                </>
                            ) :
                            (
                                <>
                                    Entrar
                                    <ArrowRightIcon className="h-5 w-5" />
                                </>
                            )}
                    </Button>
                    {/* <Button variant='outline' className='w-full h-11 text-base'>
                        Continue with Google
                    </Button> */}
                    <p className='text-center text-sm text-muted-foreground'>Ainda não tem uma conta? <Link href='/sign-up' className='text-blue-600 hover:underline'>Cadastre-se</Link></p>
                    {!emailVerified && (
                        <div className="relative rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                            <Info className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />

                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-blue-800">
                                    Seu e-mail ainda não foi verificado.
                                </p>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={isResendingEmail}
                                    onClick={handleResendVerificationEmail}
                                    className="h-auto p-0 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:bg-blue-50/70"
                                >
                                    Reenviar e-mail de verificação
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>

            </Card>
        </form>
    );
}