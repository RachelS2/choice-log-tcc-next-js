import { z } from "zod";


const userNickNameSchema : z.ZodString = z
  .string()
  .nonempty("Username is required")
  .min(5, "Username must have at least 5 characters")
  .max(15, "Username must have at tops 15 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username must contain only letters, numbers and '_'"
  );

const passwordSchema : z.ZodString = z
.string()
.nonempty("Password is required")
.min(6, "Password must have at least 6 characters")
.max(30, "Password must have at tops 30 characters")
.regex(
  /[a-z]/,
  "A senha deve conter ao menos uma letra minúscula"
)
.regex(
  /[A-Z]/,
  "A senha deve conter ao menos uma letra maiúscula"
)
.regex(
  /[0-9]/,
  "A senha deve conter ao menos um número"
)
.regex(
  /[^a-zA-Z0-9]/,
  "A senha deve conter ao menos um caractere especial"
);

const userNameSchema : z.ZodString = z 
.string()
.nonempty("Username is required")
.min(5, "Username must have at least 5 characters")
.max(50, "Username must have at tops 50 characters")
.regex(
  /^[a-zA-Z0 ]+$/,
  "Username must contain only letters."
);

// Schema para validação do formulário de cadastro de usuário:
export const startNowSchema = z
  .object({
    email: z.email("E-mail inválido"),
    nickname: userNickNameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    userName: userNameSchema,
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );


export type UserRegisterState = {
  errors?: {
    email?: string;
    nickname?: string;
    password?: string;
    userName?: string;
  };
  message?: string | null;
};
