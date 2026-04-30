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
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col items-start min-h-[calc(100vh-96px)] justify-center p-10">
            <Card className='w-full max-w-md rounded-3xl shadow-xl border-neutral-200'>
                <CardHeader className=' text-center'>
                    <CardTitle className='text-3xl'>Sign In</CardTitle>
                    <CardDescription>Access your ChoiceLog account</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' placeholder='you@example.com' {...register('email')} />
                        <p className="text-red-600 min-h-[1rem]">
                            {errors.email?.message}
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id='password' type='password' placeholder='••••••••' {...register('password')} />
                        <p className="text-red-600 min-h-[1rem]">
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                        <div className='flex items-center gap-2'>
                            <Checkbox id='remember' />
                            <Label htmlFor='remember'>Remember me</Label>
                        </div>
                        <Link href='/forgot-password' className='text-blue-600 hover:underline'>Forgot password?</Link>
                    </div>
                    <Button className='w-full h-11 text-base' type="submit" disabled={isSubmitting}>
                        Login
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