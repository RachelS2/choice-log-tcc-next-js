'use client'

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { FormInput } from '../ui/login-or-start-now/form_input';
import { AuthFormState } from '@/services/auth/auth-form-state';

type LoginFormProps = {
  onFormAction: (
    prevState: AuthFormState,
    formData: FormData
  ) => Promise<AuthFormState>;
};

export function LoginForm({ onFormAction }: LoginFormProps) {
  const initialState: AuthFormState = { message: null, errors: {} };
  const [state, action] = useActionState(onFormAction, initialState);

  return (
    <form action={action}>
      <FormInput label="E-mail" defaultValue={state.fields_values?.email}/>
      <FormInput label="Password" defaultValue={state.fields_values?.password} />

      {state.message && (
        <p className="text-red-600 text-center mt-3">
          {state.message}
        </p>
      )}

      {/* Botão */}
      <div className="flex flex-col items-center justify-center mt-5">
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
