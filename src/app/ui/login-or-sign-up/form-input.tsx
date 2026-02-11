'use client'
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import {  UserIcon } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import { UseFormRegister } from 'react-hook-form';


type FormInputProps = {
  label: 'E-mail' | 'Username' | 'Password' | 'Check Password';
  marginTop?: number,
  minLength?: number;
  register: UseFormRegister<any>;
};


export function FormInput({ label, marginTop = 0, minLength,  register }: FormInputProps) {
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
    <div className={`mt-${marginTop}`}>
      <label
        htmlFor={id}
        className="text-[1.2rem] text-superDarkGray"
      >
        {label}
      </label>

      <div className="relative bg-white">
        <Icon className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mediumGray peer-focus:text-superDarkGray-900" />

        <input
          id={id}
          placeholder={placeholder}
          {...register(id)}
          required
          className="pl-5 peer block w-full rounded-md text-[1.1rem] text-darkGray border border-beige placeholder:text-darkGray"
          {...inputProps}
        />
      </div>
    </div>
  );
}

//Shows validation error messages for a form field.
export function FieldError({ message }: { message?: string }) {
  console.log(message)
  return (
    <p className="mt-1 text-sm text-red-600 min-h-[1.25rem]">
      {message}
    </p>
  );
}
