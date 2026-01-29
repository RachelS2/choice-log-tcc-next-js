"use server";

import {startNowSchema} from '@/validations/auth/start-now.validation';
import { AuthFormState } from './auth-form-state';

export async function userRegisterService(prevState: AuthFormState, form: FormData): Promise<AuthFormState> {
    const EMAIL: string | null = form.get('email')?.toString() ?? null;
    const USERNAME: string  | null = form.get('username')?.toString() ?? null;
    const PASSWORD: string  | null = form.get('password')?.toString() ?? null;
    const CONFIRM_PASSWORD: string | null = form.get('confirmPassword')?.toString() ?? null;

    const validation= startNowSchema.safeParse({
        email: EMAIL,
        username: USERNAME,
        password: PASSWORD,
        confirmPassword: CONFIRM_PASSWORD,
    });
    console.log("Validation result:", validation);
    
    if (!validation.success) {
       return {
            errors: validation.error.flatten().fieldErrors,
            message: "Failed to register user. Please correct the errors and try again.",
            fields_values: {
                email:EMAIL,
                username:USERNAME,
                password:PASSWORD
        }
       }
    }

    // Simulação de chamada a um serviço de backend para registrar o usuário
    const isRegistered: boolean = true; // Suponha que o registro foi bem-sucedido

  // Simulação de chamada a backend
    console.log("Registering user:", { EMAIL, USERNAME, PASSWORD, CONFIRM_PASSWORD });
    if (!isRegistered) {
        return {
        errors: {},
        message: "Failed to register user due to a server error.",
        fields_values: {
            email:EMAIL,
            username:USERNAME,
            password:PASSWORD
        }
        };

    }
    return {
        errors: {},
        message: "User registered successfully"
};
}