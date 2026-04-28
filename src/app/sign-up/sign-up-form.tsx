
'use client'
import { Button } from '../../components/ui/button';
import { ArrowRightIcon , Loader2 } from 'lucide-react';
import { AuthFormStateModel } from '@/models/auth/auth-form-state-model';
import { FieldError, FormInput } from '../../components/login-or-sign-up/form-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {authClient} from '@/lib/auth-client';
import {useRouter} from "next/navigation";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';
import { useState } from 'react';

const userNameSchema : z.ZodString = z
  .string()
  .nonempty("Username is required.")
  .min(5, "Username must have at least 5 characters.")
  .max(15, "Username must have at tops 40 characters.")
  .regex(
    /^[a-zA-Z0-9_ ]+$/,
    "Username must contain only letters, white spaces, numbers and '_'"
  );

const passwordSchema : z.ZodString = z
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
const signUpSchema : z.ZodObject<{
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
  

export function StartNowForm() {

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

  const router : AppRouterInstance = useRouter();
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
            message= "User already exists";
            description= "Try logging in instead.";
          }
          else {
            message = "An error occurred during sign-up.";
            description= "Please try again with a different e-mail or contact support if the problem persists."
          }
          toast.error(message, { description: description })
        },
        
      });
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormInput label="E-mail" register={register} />
      <FieldError message={errors.email?.message} />

      <FormInput label="Username"  register={register}/>
      <FieldError message={errors.username?.message} />

      <FormInput label="Password"  minLength={6}  register={register}/>
      <FieldError message={errors.password?.message} />

      <FormInput label="Check Password" minLength={6} register={register}/>
      <FieldError message={errors.confirmPassword?.message} />

      {/* Botão */}
      <div className="flex flex-col items-center justify-center mt-1">
        <Button
          type="submit" disabled={isSubmitting} 
          className={`
            bg-blue px-4 text-sm gap-2
            sm:px-5 sm:py-2.5 sm:text-base
            md:px-6 md:py-3 md:text-lg
            min-w-[8rem]
            ${isSubmitting ? "cursor-wait opacity-70" : "cursor-pointer"}
          `}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <>
              Create Account
              <ArrowRightIcon className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}