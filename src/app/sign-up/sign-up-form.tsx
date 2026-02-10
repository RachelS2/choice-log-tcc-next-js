
'use client'
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { AuthFormStateService } from '@/services/auth/login.service';
import { FieldError, FormInput } from '../ui/login-or-sign-up/form-input';

type StartNowFormProps = {
  onFormAction: (
    prevState: AuthFormStateService,
    formData: FormData
  ) => Promise<AuthFormStateService>;
};

export function StartNowForm({ onFormAction }: StartNowFormProps) {
  const initialState: AuthFormStateService = { message: null, errors: {} };
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