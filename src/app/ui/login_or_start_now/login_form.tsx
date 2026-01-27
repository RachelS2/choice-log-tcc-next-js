'use client'
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
// import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {  UserIcon } from 'lucide-react';
import {UserRegisterState} from '@/validations/auth/start-now.validation';

type FormInputProps = {
  label: 'E-mail' | 'Username' | 'Password' | 'Check Password';
  htmlFor: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};


function FormInput({ label, htmlFor, inputProps }: FormInputProps) {
  let placeholder: string = '';
  let Icon = inputProps.type === 'password' ? KeyIcon : AtSymbolIcon;
  switch (label) {
    case 'E-mail':
      placeholder = 'Enter your email address';
      break;
    case 'Username':
      placeholder = 'Choose a username';
      Icon = UserIcon;
      break;
    case 'Password':
      placeholder = 'Enter your password';
      break;
    case 'Check Password':
      placeholder = 'Re-enter your password';
      break;
  }
  return (
    <div className="mt-4">
      <label
        className="text-[1.2rem] text-darkGray"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mediumGray peer-focus:text-darkGray-900" />
        <input
          className="pl-5 peer block w-full rounded-md text-[1.1rem] text-mediumGray border border-beige placeholder:text-lightGray"
          id={htmlFor}
          placeholder={placeholder}
          required
          {...inputProps}
        />
      </div>
    </div>
  );
}

type FormProps = {
  onFormAction: (
    prevState: UserRegisterState,
    formData: FormData
  ) => Promise<UserRegisterState>;
  isLoginForm?: boolean;
};

export default function Form({ onFormAction, isLoginForm = true }: FormProps) {
  const initialState: UserRegisterState = { message: null, errors: {} };
  const [state, onFormSubmitted] = useActionState (onFormAction, initialState);
  let btnText : string = "Log in";
  if (!isLoginForm) {
    btnText = "Create Account";
  }

  return (
    <form action={onFormSubmitted} className="flex-1 rounded-lg bg-white">
      <div>
        {/* Email */}

        <FormInput
              label="E-mail"
              htmlFor="email"
              inputProps={{
                type: "email",
                name: "email",
              }}
            />

        {/* se não for Login, cadastro */}
        {!isLoginForm && (
            <FormInput
              label="Username"
              htmlFor="username"
              inputProps={{
                type: "text",
                name: "username",
              }}
            />
        )}

        {/* Password */}
        <FormInput
              label="Password"
              htmlFor="password"
              inputProps={{
                type: "password",
                name: "password",
                minLength:6
              }}
            />

        {/* Confirm Password - apenas se não for Login (criar conta) */}
        {!isLoginForm && (
            <FormInput
              label="Check Password"
              htmlFor="confirmPassword"
              inputProps={{
                type: "password",
                name: "confirmPassword",
                minLength:6

              }}
            />
        )}
      </div>

      {/* Botão */}
      <div className="flex flex-col items-center justify-center mt-5">
        <input type="hidden" name="redirectTo" />

      <Button
        type="submit"
        className="bg-accent px-4  text-sm gap-2 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg min-w-[8rem]"
      >
        {btnText}
        <ArrowRightIcon className="h-5 w-5" />
      </Button>
      </div>

    </form>
  );
}

