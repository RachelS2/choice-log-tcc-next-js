import { z } from "zod";

// Schema para validação do formulário de login de usuário:
export const loginSchema: z.ZodObject = z.object({
  email: z.email("E-mail inválido"),
  password:  z.email("E-mail inválido"),

});

export type LoginState = {
  errors?: {
    email?: string;
    // nickname?: string;
    password?: string;
    // userName?: string;
  };
  message?: string | null;
};
