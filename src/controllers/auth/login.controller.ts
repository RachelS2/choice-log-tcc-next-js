"use server";


import { AuthFormStateController } from "./auth-form.controller";

export async function loginController(
  prevState: AuthFormStateController,
  formData: FormData
): Promise<AuthFormStateController> {

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
  // TODO: regra de negócio
  // verificar usuário, senha, etc.
  return {
    message: "Login realizado com sucesso",
    errors: {},
  };

}