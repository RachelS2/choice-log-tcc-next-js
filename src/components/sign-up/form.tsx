'use client';
import { Mail, User, Lock, EyeOff, Eye, Link } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import z from 'zod';
import { AuthFormStateModel } from "@/models/auth/auth-form-state-model";

type HtmlFor = "name" | "email" | "password" | "confirmPassword";

function createLabelsAndInputs(htmlFor: HtmlFor, placeholder: string, Icon: React.ComponentType<{ className?: string }>) {
    const labelText = htmlFor.charAt(0).toUpperCase() + htmlFor.slice(1);
    return (
        <div className="space-y-2">
            <Label
                htmlFor={htmlFor}
                className="flex items-center gap-2 text-base"
            >
                <Icon className="h-4 w-4 text-neutral-500" />
                {labelText}
            </Label>

            <Input
                id={htmlFor}
                placeholder={placeholder}
                className="h-11 text-base"
            />
        </div>
    );
}

const userNameSchema: z.ZodString = z
    .string()
    .nonempty("Username is required.")
    .min(5, "Username must have at least 5 characters.")
    .max(15, "Username must have at tops 40 characters.")
    .regex(
        /^[a-zA-Z0-9_ ]+$/,
        "Username must contain only letters, white spaces, numbers and '_'"
    );

const passwordSchema: z.ZodString = z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must have at least 6 characters.")
    .max(30, "Password must have at tops 30 characters.")
    .regex(
        /[a-z]/,
        "The password must contain at least one lowercase letter."
    )
    .regex(
        /[A-Z]/,
        "The password must contain at least one uppercase letter."
    )
    .regex(
        /[0-9]/,
        "The password must contain at least one number."
    )
    .regex(
        /[^a-zA-Z0-9]/,
        "The password must contain at least one special character."
    );


// Schema para validação do formulário de cadastro de usuário:
const signUpSchema: z.ZodObject<{
    email: z.ZodEmail;
    username: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip> = z
    .object({
        email: z.email("Invalid e-mail format."),
        username: userNameSchema,
        password: passwordSchema,
        confirmPassword: z.string().nonempty("Password confirmation is required."),
    })
    .superRefine((data, ctx) => {
        const passwordCheck = passwordSchema.safeParse(data.password);

        if (passwordCheck.error) return; // Se a senha não for válida, não faz a verificação de correspondência
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                message: "Passwords do not match.",
                code: z.ZodIssueCode.custom,
            });
        }
    });

type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
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

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleOnSubmit(signUpData: SignUpSchemaType) {
        console.log(signUpData)
        setIsSubmitting(true);
        // await fetch("/api/dev/delete-all-users", { method: "DELETE" }); // TODO: Remove this row later
        await authClient.signUp.email({
            email: signUpData.email,
            name: signUpData.username,
            password: signUpData.password,
            callbackURL: "/dashboard",
        }, {

            onSuccess: () => {
                toast.success("Successfully signed up!", { description: "Please login to get started.." })
                router.replace("/login");
            },
            onError: (ctx) => {
                console.log(ctx.error.message);
                console.log(ctx.error.code);
                let message: string = "";
                let description: string = "";
                if (ctx.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
                    message = "User already exists";
                    description = "Try logging in instead.";
                }
                else {
                    message = "An error occurred during sign-up.";
                    description = "Please try again with a different e-mail or contact support if the problem persists."
                }
                toast.error(message, { description: description })
            },

        });
        setIsSubmitting(false);
    }
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
            <Card className="w-full max-w-md rounded-3xl border-neutral-200 shadow-2xl">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-3xl">
                        Create Account
                    </CardTitle>

                    <CardDescription className="text-base">
                        Start tracking your shopping experiences
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                    {createLabelsAndInputs("name", "Your name", User)}

                    {createLabelsAndInputs("email", "you@example.com", Mail)}

                    {createLabelsAndInputs("password", "At least 8 characters", Lock)}

                    {createLabelsAndInputs("confirmPassword", "Confirm your password", Lock)}

                    {/* BUTTON */}
                    <Button className="h-11 w-full text-base">
                        Create Account
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
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}