'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UseFormRegister } from 'react-hook-form'


type PasswordInputProps = {
  register: UseFormRegister<{
    email: string;
    password: string;
}>
}

export default function PasswordInput({
  register,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        className="pr-10 !text-base"
        {...register('password')}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-neutral-800" />
        ) : (
          <Eye className="h-4 w-4 text-neutral-800" />
        )}
      </Button>
    </div>
  )
}