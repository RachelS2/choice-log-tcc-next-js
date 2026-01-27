"use server";

import {startNowSchema, UserRegisterState} from '@/validations/auth/start-now.validation';
import { ZodSafeParseResult } from 'zod';

export async function userRegisterService(prevState: UserRegisterState, form: FormData): Promise<UserRegisterState> {
    const validation= startNowSchema.safeParse({
        email: form.get('email'),
        nickname: form.get('nickname'),
        password: form.get('password'),
        userName: form.get('userName')
    });
    console.log("Validation result:", validation);
    if (!validation.success) {
       return {
            errors: validation.error.flatten().fieldErrors,
            message: "Failed to register user. Please correct the errors and try again."
       }
    }

    const { email, nickname, password, userName } = validation.data;

    // Simulação de chamada a um serviço de backend para registrar o usuário
    const isRegistered: boolean = true; // Suponha que o registro foi bem-sucedido

  // Simulação de chamada a backend
    console.log("Registering user:", { email, nickname, password, userName });
    if (!isRegistered) {
        return {
        errors: {},
        message: "Failed to register user due to a server error."
        };
    }
    return {
        errors: {},
        message: "User registered successfully"
};
}