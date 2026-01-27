"use server";

import { loginSchema } from "@/validations/auth/login.validation";
import { UserRegisterState } from "@/validations/auth/start-now.validation";

export async function loginService(
  prevState: UserRegisterState,
  formData: FormData
): Promise<UserRegisterState> {

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: null,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // regra de negócio
  // verificar usuário, senha, etc.
  console.log("Usuário logado:", parsed.data);
  return {
    message: "Login realizado com sucesso",
    errors: {},
  };

}