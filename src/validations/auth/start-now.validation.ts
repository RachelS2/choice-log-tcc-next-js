import { z } from "zod";


const userNameSchema : z.ZodString = z
  .string()
  .nonempty("Username is required.")
  .min(5, "Username must have at least 5 characters.")
  .max(15, "Username must have at tops 40 characters.")
  .regex(
    /^[a-zA-Z0-9_ ]+$/,
    "Username must contain only letters, white spaces, numbers and '_'"
  );

const passwordSchema : z.ZodString = z
.string()
.nonempty("Password is required.")
.min(6, "Password must have at least 6 characters.")
.max(30, "Password must have at tops 30 characters.")
.regex(
  /[a-z]/,
  "The password must contain at least one lowercase letter."
)
.regex(
  /[A-Z]/,
  "The password must contain at least one uppercase letter."
)
.regex(
  /[0-9]/,
  "The password must contain at least one number."
)
.regex(
  /[^a-zA-Z0-9]/,
  "The password must contain at least one special character."
);


// Schema para validação do formulário de cadastro de usuário:
export const startNowSchema : z.ZodObject<{
    email: z.ZodEmail;
    username: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip> = z
  .object({
    email: z.email("Invalid e-mail format."),
    username: userNameSchema,
    password: passwordSchema,
    confirmPassword: z.string().nonempty("Password confirmation is required."),
  })
  .superRefine((data, ctx) => {
    const passwordCheck = passwordSchema.safeParse(data.password);

    if (passwordCheck.error) return; // Se a senha não for válida, não faz a verificação de correspondência
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match.",
        code: z.ZodIssueCode.custom,
      });
    }
  });
