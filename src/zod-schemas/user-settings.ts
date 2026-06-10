import z from "zod";
import { userNameSchema, passwordSchema } from "./sign-up";
import { IncomeRange } from "../../generated/prisma";

// Schema para validação do formulário de cadastro de usuário:
export const userSettingsSchema = z.object({
  email: z.email("Invalid e-mail format."),
  username: userNameSchema,
  incomeRange: z.enum(IncomeRange),
  image: z.string().url("Invalid URL format for profile image.").optional(),
});

export type UserSettingsSchemaType = z.infer<typeof userSettingsSchema>;


// Schema para validação do formulário de cadastro de usuário:
export const changePasswordSchema: z.ZodObject<{
  password: z.ZodString;
  newPassword: z.ZodString;
  confirmPassword: z.ZodString;
}, z.core.$strip> = z
  .object({
    password: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().nonempty("Password confirmation is required."),
  })
  .superRefine((data, ctx) => {
    const passwordCheck = passwordSchema.safeParse(data.newPassword);

    if (passwordCheck.error) return; // Se a senha não for válida, não faz a verificação de correspondência
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;