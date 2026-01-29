"use server";

import {startNowSchema} from '@/validations/auth/start-now.validation';
import { AuthFormStateController } from './auth-form.controller';
import { ZodSafeParseResult } from 'zod';

export async function userRegisterController(prevState: AuthFormStateController, form: FormData): Promise<AuthFormStateController> {
    const EMAIL: string | undefined = form.get('email')?.toString() ?? undefined;
    const USERNAME: string  | undefined = form.get('username')?.toString() ?? undefined;
    const PASSWORD: string  | undefined = form.get('password')?.toString() ?? undefined;
    const CONFIRM_PASSWORD: string | undefined = form.get('confirmPassword')?.toString() ?? undefined;

    const validation: ZodSafeParseResult<{ email: string; username: string; password: string; confirmPassword: string; }> = 
    startNowSchema.safeParse({
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
        fields_values: 
        {
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