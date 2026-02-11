"use server";

export type AuthFormStateService = {
  errors?:
  {
    email?: string[],
    username?: string[],
    password?: string[],
    confirmPassword?: string[],
  }
  message?: string | null;
  fields_values?: 
  {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
};


export async function loginService(
  formData: FormData
): Promise<AuthFormStateService> {

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