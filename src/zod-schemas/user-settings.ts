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