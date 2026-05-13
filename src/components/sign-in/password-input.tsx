import { useState } from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PasswordInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  placeholder?: string;
};

export default function PasswordInput<
  T extends FieldValues
>({
  register,
  name,
  placeholder = "••••••••",
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">
      <Input
        id={String(name)}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10 !text-base"
        {...register(name)}
      />

      <button
        type="button"
        // variant="ghost"
        //size="icon"
        onClick={() =>
          setShowPassword(!showPassword)
        }
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer hover:bg-transparent"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-neutral-800" />
        ) : (
          <Eye className="h-4 w-4 text-neutral-800" />
        )}
      </button>
    </div>
  );
}