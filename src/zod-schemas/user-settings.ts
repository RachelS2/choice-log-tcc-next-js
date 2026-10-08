import z from "zod";
import { userNameSchema, passwordSchema } from "./sign-up-schema";

// Schema para validação do formulário de cadastro de usuário:
export const userSettingsSchema = z.object({
  email: z.email("Formato de e-mail inválido.."),
  username: userNameSchema,
  incomeRange: z.enum(["UP_TO_1_MINIMUM_WAGE", "FROM_1_TO_3", "FROM_3_TO_5", "FROM_5_TO_10", "ABOVE_10", "PREFER_NOT_TO_SAY"]),
  image: z.string().url("Invalid URL format for profile image.").optional(),
});

export type UserSettingsSchemaType = z.infer<typeof userSettingsSchema>;

//Schema para validação do formulário de redefinição de senha (esqueci minha senha):
export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().nonempty("Confirmação de senha é requerida."),
  })
  .superRefine((data, ctx) => {
    const passwordCheck = passwordSchema.safeParse(data.newPassword);

    if (passwordCheck.error) return;

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas informadas não são iguais.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;


// Schema para validação do formulário de cadastro de usuário:
export const changePasswordSchema = resetPasswordSchema
  .extend({
    password: z.string(),
  })
  .refine(
    (data) => data.newPassword !== data.password,
    {
      message: "A nova senha deve ser diferente da senha atual!.",
      path: ["newPassword"],
    }
  );

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;