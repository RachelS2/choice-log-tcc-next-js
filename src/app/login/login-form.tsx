'use client'
import { useForm } from "react-hook-form"
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { FormInput } from '../ui/login-or-sign-up/form-input';
import {} from '@/lib/auth-client'
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod";
import { AuthFormStateService } from "@/services/auth/login.service";

// Schema para validação do formulário de login de usuário:
const loginSchema = z.object({
  email: z.email("Invalid e-mail format."),
  password:  z.string().min(1, "Password is required")
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const initialState: AuthFormStateService = { message: null, errors: {} };

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

  function handleOnSubmit(loginData: LoginSchemaType) {
    console.log(loginData)
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
          type="submit"
          className="bg-accent px-4  text-sm gap-2 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg min-w-[8rem]"
        >
          Login
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
