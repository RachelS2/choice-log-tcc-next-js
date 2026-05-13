'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { AuthFormStateModel } from '@/models/auth/auth-form-state-model';
import {useRouter} from "next/navigation";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import PasswordInput from './password-input';
import { ArrowRightIcon, Lock, Loader2 } from 'lucide-react';
import { AtSymbolIcon } from '@heroicons/react/24/outline';

// Schema para validação do formulário de login de usuário:
const loginSchema = z.object({
  email: z.email("E-mail is required."),
  password:  z.string().min(1, "Password is required.")
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm(){
    const initialState: AuthFormStateModel = { message: null, errors: {} };
    const router  = useRouter();
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
    async function handleOnSubmit(loginData: LoginSchemaType) {
        setIsSubmitting(true);
        await authClient.signIn.email({
        email: loginData.email,
        password: loginData.password,
        callbackURL: "/dashboard", 
        rememberMe: rememberMe,
        }
        , {
        onSuccess: () => {
            router.replace("/dashboard");
        },
        onError: (ctx) => {
            if (ctx.error.status === 401) {
                toast.warning("Invalid credentials.", { description: "Please check your e-mail and password and try again." })
            }
            else {
                toast.error("An error occurred during login.", { description: ctx.error.message })
                console.error(ctx.error.status);
            }
        }
        });
        setIsSubmitting(false);
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 
    // rememberMe falso = sessão acaba ao fechar navegador, true = sessão persiste por 7 dias ou até o usuário deslogar manualmente
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col items-start min-h-[calc(100vh-96px)] justify-center p-10">
            <Card className='w-full max-w-md rounded-3xl shadow-xl border-neutral-200'>
                <CardHeader className=' text-center'>
                    <CardTitle className='text-3xl'>Sign In</CardTitle>
                    <CardDescription className='text-xl'>Access your ChoiceLog account</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <AtSymbolIcon className="h-4 w-4 text-neutral-500" />

                            <Label htmlFor='email' className="text-lg">Email</Label>
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
                                Password
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
                            <Label htmlFor='remember'>Remember me</Label>
                        </div>
                        <Link href='/forgot-password' className='text-blue-600 hover:underline'>Forgot password?</Link>
                    </div>
                    <Button className='w-full h-11 text-base bg-blue-500 hover:bg-blue-700' type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 
                            ( 
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Logging in...</span>
                                </>
                            ) : 
                            ( 
                                <>
                                    Login
                                    <ArrowRightIcon className="h-5 w-5" />
                                </>
                            )}
                    </Button>
                    {/* <Button variant='outline' className='w-full h-11 text-base'>
                        Continue with Google
                    </Button> */}
                    <p className='text-center text-sm text-muted-foreground'>Don’t have an account? <Link href='/sign-up' className='text-blue-600 hover:underline'>Create one</Link></p>
                </CardContent>
            </Card>
        </form>
    );
}