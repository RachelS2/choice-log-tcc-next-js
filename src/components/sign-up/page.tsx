'use client';
import { Mail, User, Lock, Loader2, ArrowRightIcon, MailCheck, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { FieldError, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AuthFormStateModel } from "@/models/auth/auth-form-state-model";
import PasswordInput from "../sign-in/password-input";
import Link from "next/link";
import { signUpSchema, SignUpSchemaType } from "@/zod-schemas/sign-up-schema";
import VerifyEmailPage from "./verify-email/page";

type HtmlFor = "username" | "email" | "password" | "confirmPassword";


function createLabelsAndInputs(
    htmlFor: HtmlFor,
    placeholder: string,
    Icon: React.ComponentType<{ className?: string }>,
    errors: FieldError | undefined,
    register: UseFormRegister<SignUpSchemaType>
) {

    const isPasswordField =
        htmlFor === "password" ||
        htmlFor === "confirmPassword";
    const labelText =
        htmlFor === "username"
            ? "Nome de usuário"
            : htmlFor === "email"
                ? "E-mail"
                : htmlFor === "password"
                    ? "Senha"
                    : "Confirmar senha";

    return (
        <div className="space-y-1 w-full">
            <Label
                htmlFor={htmlFor}
                className="flex items-center gap-2 text-base"
            >
                <Icon className="h-4 w-4 text-neutral-500" />
                {labelText}
            </Label>

            {isPasswordField ? (
                <PasswordInput
                    register={register} name={htmlFor} />
            ) : (
                <Input
                    id={htmlFor}
                    {...register(htmlFor)}
                    placeholder={placeholder}
                    className="w-full !text-base"
                />
            )}

            <p className="mt-1 max-w-full break-words text-sm text-red-500">
                {errors?.message}
            </p>
        </div>
    );
}

export default function SignUpForm() {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("your e-mail address");

    const initialState: AuthFormStateModel = { message: null, errors: {} };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: initialState?.fields_values?.email ?? "",
            username: initialState?.fields_values?.username ?? "",
            password: initialState?.fields_values?.password ?? "",
            confirmPassword: initialState?.fields_values?.confirmPassword ?? "",
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleOnSubmit(signUpData: SignUpSchemaType) {
        console.log(signUpData)
        setIsSubmitting(true);
        // await fetch("/api/dev/delete-all-users", { method: "DELETE" }); // TODO: Remove this row later
        await authClient.signUp.email({
            email: signUpData.email,
            name: signUpData.username,
            password: signUpData.password,
        }, {

            onSuccess: () => {
                toast.success("Cadastro realizado com sucesso!", { description: "Faça login para começar." })
                setEmail(signUpData.email);
                setEmailSent(true);
            },
            onError: (ctx) => {
                console.log(ctx.error.message);
                console.log(ctx.error.code);
                let message: string = "";
                let description: string = "";
                if (ctx.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
                    message = "Usuário já existe";
                    description = "Tente fazer login em vez disso.";
                }
                else {
                    message = "Ocorreu um erro durante o cadastro.";
                    description = "Tente novamente com outro e-mail ou entre em contato com o suporte se o problema persistir."
                }
                toast.error(message, { description: description })
            },

        });
        setIsSubmitting(false);
    }
    return (
        !emailSent ? (
            <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full max-w-2xl">
                <Card className="w-full min-w-[30rem] rounded-3xl border border-white/10 bg-white shadow-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl">
                            Cadastre-se
                        </CardTitle>

                        <CardDescription className="text-base">
                            Comece a acompanhar suas experiências de compra
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5 w-full">
                        {/* <div className="grid gap-5"> */}

                        {createLabelsAndInputs("username", "Seu nome de usuário", User, errors.username, register)}

                        {createLabelsAndInputs("email", "voce@exemplo.com", Mail, errors.email, register)}

                        {createLabelsAndInputs("password", "Mínimo de 8 caracteres", Lock, errors.password, register)}

                        {createLabelsAndInputs("confirmPassword", "Confirme sua senha", Lock, errors.confirmPassword, register)}

                        {/* </div> */}


                        {/* BUTTON */}
                        <Button className='w-full h-11 text-base bg-blue-500 hover:bg-blue-700'
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ?
                                (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Criando conta...</span>
                                    </>
                                ) :
                                (
                                    <>
                                        Criar conta
                                        <ArrowRightIcon className="h-5 w-5" />
                                    </>
                                )}
                        </Button>

                        {/* GOOGLE */}
                        {/* <Button
                        variant="outline"
                        className="h-11 w-full text-base"
                    >
                        Continue with Google
                    </Button> */}

                        {/* FOOTER */}
                        <p className="text-center text-sm text-muted-foreground">
                            Já tem uma conta?{" "}
                            <Link
                                href="/sign-in"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Entrar
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </form>) :
            (
                <VerifyEmailPage email={email} />
            )
    );
}