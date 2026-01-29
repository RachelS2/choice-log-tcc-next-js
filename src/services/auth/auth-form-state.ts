export type AuthFormState = {
  errors?:
  {
    email?: string[],
    username?: string[],
    password?: string[],
    confirmPassword?: string[],
  }
  message?: string | null;
  fields_values?: 
  {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
};
