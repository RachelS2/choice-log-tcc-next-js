import z from "zod";

// Schema para validação do formulário de login de usuário:
export const loginSchema = z.object({
  email: z.email("E-mail is required."),
  password:  z.string().min(1, "Password is required.")
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
