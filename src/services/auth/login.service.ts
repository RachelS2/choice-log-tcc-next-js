"use server";

import { loginSchema } from "@/validations/auth/login.validation";
import { boolean } from "zod";
import { AuthFormState } from "./auth-form-state";

export async function loginService(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {

  // TODO: regra de negócio
  // verificar usuário, senha, etc.
  const email : string = formData.get("email")?.toString() ?? "";
  const password : string = formData.get("password")?.toString() ?? "";
  const loggedUser: boolean = false;

  if (!loggedUser) {
    return {
      message: "Falha no login. Verifique suas credenciais.",
      errors: {
        password: ["E-mail ou senha incorretos"],
      },
    };
  }
  return {
    message: "Login realizado com sucesso",
    errors: {},
  };

}