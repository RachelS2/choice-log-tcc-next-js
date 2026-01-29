"use server";


import { AuthFormStateController } from "./auth-form.controller";

export async function loginController(
  prevState: AuthFormStateController,
  formData: FormData
): Promise<AuthFormStateController> {

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