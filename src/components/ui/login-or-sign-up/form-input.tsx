'use client'
import {
  AtSymbolIcon,
  EyeSlashIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import {  EyeIcon, UserIcon } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps, useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField: boolean = label === 'Password' || label === 'Check Password';
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
        <Icon className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] ml-1 -translate-y-1/2 text-mediumGray peer-focus:text-superDarkGray-900" />

        <input
          id={id}
          placeholder={placeholder}
          {...register(id)}
          required
          type={isPasswordField ? (showPassword ? 'text' : 'password') : inputProps.type}
          className="pl-8 pr-8 peer block w-full rounded-md text-[1.1rem] text-darkGray border border-beige placeholder:text-darkGray"
          {...inputProps}
        />
        {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-darkGray"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-[18px] w-[18px]" />
          ) : (
            <EyeIcon className="h-[18px] w-[18px]" />
          )}
        </button>
      )}
      </div>
    </div>
  );
}

//Shows validation error messages for a form field.
export function FieldError({ message }: { message?: string }) {
  return (
    <p className="mt-1 text-sm text-red-600 min-h-[1.25rem]">
      {message}
    </p>
  );
}
