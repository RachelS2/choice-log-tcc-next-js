import z from "zod";

// Schema para validação do formulário de login de usuário:
export const loginSchema = z.object({
  email: z.email("E-mail é obrigatório."),
  password:  z.string().min(1, "Senha é obrigatória.")
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
