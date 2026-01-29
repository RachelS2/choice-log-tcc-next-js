
'use client'
import { useActionState } from 'react';
import {FormInput, FieldError} from "@/app/ui/login-or-start-now/form-input";
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { AuthFormStateController } from '@/controllers/auth/auth-form.controller';

type StartNowFormProps = {
  onFormAction: (
    prevState: AuthFormStateController,
    formData: FormData
  ) => Promise<AuthFormStateController>;
};

export function StartNowForm({ onFormAction }: StartNowFormProps) {
  const initialState: AuthFormStateController = { message: null, errors: {} };
  const [state, action] = useActionState(onFormAction, initialState);

  return (
    <form action={action}>
      <FormInput label="E-mail" defaultValue={state.fields_values?.email}/>
      <FieldError message={state.errors?.email} />

      <FormInput label="Username" defaultValue={state.fields_values?.username}/>
      <FieldError message={state.errors?.username} />

      <FormInput label="Password"  minLength={6} defaultValue={state.fields_values?.password}/>
      <FieldError message={state.errors?.password} />

      <FormInput label="Check Password" minLength={6} defaultValue={state.fields_values?.confirmPassword}/>
      <FieldError message={state.errors?.confirmPassword} />

      {/* Botão */}
      <div className="flex flex-col items-center justify-center mt-1">
        <input type="hidden" name="redirectTo" />
        <Button
          type="submit"
          className="bg-accent px-4  text-sm gap-2 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg min-w-[8rem]"
        >
          Create Account
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}