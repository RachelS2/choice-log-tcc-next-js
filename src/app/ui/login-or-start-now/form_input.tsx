'use client'
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import {  UserIcon } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';


type FormInputProps = {
  label: 'E-mail' | 'Username' | 'Password' | 'Check Password';
  minLength?: number;
  defaultValue?: string | null; 
};


export function FormInput({ label, minLength, defaultValue }: FormInputProps) {
  let placeholder: string = '';
  let id : 'email' | 'username' | 'password' | 'confirmPassword' = 'email';
  let inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
  let Icon : ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
} & RefAttributes<SVGSVGElement>>= AtSymbolIcon;

  switch (label) {
    case 'E-mail':
      placeholder = 'Enter your email address';
      id = 'email';
      inputProps = { name: id, type: id };
      Icon = AtSymbolIcon;
      break;

    case 'Username':
      placeholder = 'Choose a username';
      id = 'username';
      inputProps = { name: 'username' };
      Icon = UserIcon;
      break;

    case 'Password':
      placeholder = 'Enter your password';
      id = 'password';
      inputProps = { 
        name: id, 
        type: id,
        ...(minLength && { minLength })
      };
      Icon = KeyIcon;
      break;

    case 'Check Password':
      placeholder = 'Re-enter your password';
      id = 'confirmPassword';
      inputProps = { 
        name: id, 
        type: 'password',
        ...(minLength && { minLength })
      };
      Icon = KeyIcon;
      break;
  }

  return (
    <div className="mt-4">
      <label
        htmlFor={id}
        className="text-[1.2rem] text-darkGray"
      >
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mediumGray peer-focus:text-darkGray-900" />

        <input
          id={id}
          placeholder={placeholder}
          defaultValue={(defaultValue !== null && defaultValue !== undefined) ? defaultValue : ''}
          required
          className="pl-5 peer block w-full rounded-md text-[1.1rem] text-mediumGray border border-beige placeholder:text-lightGray"
          {...inputProps}
        />
      </div>
    </div>
  );
}

//Shows validation error messages for a form field.
export function FieldError({ message }: { message?: string | undefined }) {
  if (!message || message.length === 0) return null;

  return (
    <p className="mt-1 text-sm text-red-600">
      {message[0]}
    </p>
  );
}