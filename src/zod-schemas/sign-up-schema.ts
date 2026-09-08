import z from "zod";

export const userNameSchema: z.ZodString = z
  .string()
  .nonempty("Nome de usuário é obrigatório.")
  .min(5, "Nome de usuário deve ter no mínimo 5 caracteres.")
  .max(15, "Nome de usuário deve ter no máximo 15 caracteres.")
  .regex(
    /^[a-zA-Z0-9_ ]+$/,
    "Nome de usuário must contain only letters, white spaces, numbers and underscores."
  );

export const passwordSchema: z.ZodString = z
  .string()
  .nonempty("Senha é obrigatório.")
  .min(6, "Senha deve ter no mínimo 6 caracteres.")
  .max(30, "Senha deve ter no máximo 30 caracteres.")
  .regex(
    /[a-z]/,
    "A senha deve conter pelo menos uma letra minúscula."
  )
  .regex(
    /[A-Z]/,
    "A senha deve conter pelo menos uma letra maiúscula."
  )
  .regex(
    /[0-9]/,
    "A senha deve conter pelo menos um número."
  )
  .regex(
    /[^a-zA-Z0-9]/,
    "A senha deve conter pelo menos um caractere especial."
  );


// Schema para validação do formulário de cadastro de usuário:
export const signUpSchema: z.ZodObject<{
  email: z.ZodEmail;
  username: z.ZodString;
  password: z.ZodString;
  confirmPassword: z.ZodString;
}, z.core.$strip> = z
  .object({
    email: z.email("Formato de e-mail inválido."),
    username: userNameSchema,
    password: passwordSchema,
    confirmPassword: z.string().nonempty("Confirmação de senha é obrigatória."),
  })
  .superRefine((data, ctx) => {
    const passwordCheck = passwordSchema.safeParse(data.password);

    if (passwordCheck.error) return; // Se a senha não for válida, não faz a verificação de correspondência
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas não são iguais.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;