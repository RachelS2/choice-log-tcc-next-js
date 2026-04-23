'use client'

import {
  AtSymbolIcon,
  EyeSlashIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { EyeIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import {
  FieldValues,
  UseFormRegister,
  Path
} from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  label: 'E-mail' | 'Username' | 'Password' | 'Check Password';
  marginTop?: number;
  minLength?: number;
  register: UseFormRegister<T>;
};

export function FormInput<T extends FieldValues>({
  label,
  marginTop = 0,
  minLength,
  register,
}: FormInputProps<T>) {

  let placeholder = '';
  let name: Path<T> = 'email' as Path<T>;
  let type: string | undefined = 'text';
  let Icon: React.ElementType = AtSymbolIcon;

  const [showPassword, setShowPassword] = useState(false);
  
  switch (label) {
    case 'E-mail':
      placeholder = 'Enter your email address';
      name = 'email' as Path<T>;
      type = 'email';
      Icon = AtSymbolIcon;
      break;
      
      case 'Username':
        placeholder = 'Choose a username';
        name = 'username' as Path<T>;
        type = 'text';
        Icon = UserIcon;
        break;
        
        case 'Password':
          placeholder = 'Enter your password';
          name = 'password' as Path<T>;
          type = 'password';
          Icon = KeyIcon;
          break;
          
          case 'Check Password':
            placeholder = 'Re-enter your password';
            name = 'confirmPassword' as Path<T>;
            type = 'password';
            Icon = KeyIcon;
            break;
          }
          
  const isPasswordField: boolean = label === 'Password' || label === 'Check Password';
  return (
    <div style={{ marginTop }}>
      <label
        htmlFor={name}
        className="text-[1.2rem] text-superDarkGray"
      >
        {label}
      </label>

      <div className="relative bg-white">
        <Icon className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] ml-1 -translate-y-1/2 text-mediumGray" />

        <input
          id={name}
          placeholder={placeholder}
          {...register(name, { minLength })}
          required
          type={
            isPasswordField
              ? showPassword
                ? 'text'
                : 'password'
              : type
          }
          className="pl-8 pr-8 peer block w-full rounded-md text-[1.1rem] text-darkGray border border-beige placeholder:text-darkGray"
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
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

// erro
export function FieldError({ message }: { message?: string }) {
  return (
    <p className="mt-1 text-sm text-red-600 min-h-[1.25rem]">
      {message}
    </p>
  );
}