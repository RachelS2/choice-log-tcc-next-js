'use client'

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { FormInput } from '../ui/login-or-start-now/form-input';
import { AuthFormStateController } from '@/controllers/auth/auth-form.controller';

type LoginFormProps = {
  onFormAction: (
    prevState: AuthFormStateController,
    formData: FormData
  ) => Promise<AuthFormStateController>;
};

export function LoginForm({ onFormAction }: LoginFormProps) {
  const initialState: AuthFormStateController = { message: null, errors: {} };
  const [state, action] = useActionState(onFormAction, initialState);

  return (
    <form action={action}>
      <FormInput label="E-mail" marginTop={4} defaultValue={state.fields_values?.email}/>
      <FormInput label="Password" marginTop={4} defaultValue={state.fields_values?.password} />

      <p className="text-red-600 mt-1 min-h-[1.25rem]">
        {state.message ?? ""}
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
