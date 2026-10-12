import { useState } from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PasswordInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
  className?: string;
};

export default function PasswordInput<
  T extends FieldValues
>({
  register,
  name,
  placeholder = "Insira uma senha.",
  className
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">
      <Input
        id={String(name)}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={cn("pr-10 !text-base", className)}
        {...register(name)}
      />

      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowPassword((previous) => !previous);
        }}
        className="absolute right-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 border-none bg-transparent shadow-none hover:bg-transparent focus-visible:ring-0"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 pointer-events-none text-neutral-800" />
        ) : (
          <Eye className="h-5 w-5 pointer-events-none text-neutral-800" />
        )}
      </Button>
    </div>
  );
}