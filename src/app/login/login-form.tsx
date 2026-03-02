'use client'
import { useForm } from "react-hook-form"
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import { FormInput } from '../../components/ui/login-or-sign-up/form-input';
import { authClient } from '@/lib/auth-client'
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod";
import { AuthFormStateModel } from "@/models/auth/auth-form-state-model";
import {useRouter} from "next/navigation";
import { toast } from "sonner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from 'react';
import { Loader2 } from "lucide-react";

// Schema para validação do formulário de login de usuário:
const loginSchema = z.object({
  email: z.email("Invalid e-mail format."),
  password:  z.string().min(1, "Password is required")
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const initialState: AuthFormStateModel = { message: null, errors: {} };
  const router: AppRouterInstance  = useRouter();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleOnSubmit(loginData: LoginSchemaType) {
    setIsSubmitting(true);
    await authClient.signIn.email({
      email: loginData.email,
      password: loginData.password,
      callbackURL: "/home", 
    }
    , {
      onSuccess: () => {
        router.replace("/home");
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
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>

      <FormInput label="E-mail" marginTop={4} register={register}/>
      <FormInput label="Password" marginTop={4} register={register} />

      <p className="text-red-600 mt-1 min-h-[1.25rem]">
        {errors.email?.message}
      </p>


      {/* Botão */}
      <div className="flex flex-col items-center mt-2 justify-center">
        <input type="hidden" name="redirectTo" />

        <Button
          type="submit" disabled={isSubmitting} 
          className={`
            bg-seaBlue px-4 text-sm gap-2
            sm:px-5 sm:py-2.5 sm:text-base
            md:px-6 md:py-3 md:text-lg
            min-w-[8rem]
            ${isSubmitting ? "cursor-wait opacity-70" : "cursor-pointer"}
          `}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              Login
              <ArrowRightIcon className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
