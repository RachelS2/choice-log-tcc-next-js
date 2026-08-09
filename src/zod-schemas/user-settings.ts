import z from "zod";
import { userNameSchema, passwordSchema } from "./sign-up-schema";
import { IncomeRange } from "../../generated/prisma";

// Schema para validação do formulário de cadastro de usuário:
export const userSettingsSchema = z.object({
  email: z.email("Invalid e-mail format."),
  username: userNameSchema,
  incomeRange: z.enum(IncomeRange),
  image: z.string().url("Invalid URL format for profile image.").optional(),
});

export type UserSettingsSchemaType = z.infer<typeof userSettingsSchema>;

//Schema para validação do formulário de redefinição de senha (esqueci minha senha):
export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().nonempty("Password confirmation is required."),
  })
  .superRefine((data, ctx) => {
    const passwordCheck = passwordSchema.safeParse(data.newPassword);

    if (passwordCheck.error) return;

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match.",
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
      message: "New password must be different from the current password.",
      path: ["newPassword"],
    }
  );

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;