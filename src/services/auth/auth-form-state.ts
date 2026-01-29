export type AuthFormState = {
  errors?: {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
  message?: string | null;
  fields_values?: {
    email?: string | null;
    username?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
  };
};
