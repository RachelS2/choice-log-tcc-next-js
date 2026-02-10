"use server";

import {startNowSchema} from '@/validations/auth/sign-up.validation';
import { ZodSafeParseResult } from 'zod';
import { AuthFormStateService } from './login.service';

export async function userSignUpService(prevState: AuthFormStateService, form: FormData): Promise<AuthFormStateService> {
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

    const isRegistered : boolean = await checkUserExistanceService(validation.data.email);

    // Simulação de chamada a um serviço de backend para registrar o usuário

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

function checkUserExistanceService(email: string): Promise<boolean> {
    // Simulação de verificação de existência do usuário no backend
    console.log("Checking if user exists with email:", email);
    return new Promise((resolve) => {
        setTimeout(() => {
            const userExists = false; // Simulação: o usuário não existe
            resolve(userExists);
        }, 1000); // Simula um atraso de 1 segundo para a resposta do backend
    });
}