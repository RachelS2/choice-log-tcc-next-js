import { AuthFormStateService } from './login.service';

export async function userSignUpService(form: FormData): Promise<AuthFormStateService> {
    const EMAIL: string | undefined = form.get('email')?.toString() ?? undefined;
    const USERNAME: string  | undefined = form.get('username')?.toString() ?? undefined;
    const PASSWORD: string  | undefined = form.get('password')?.toString() ?? undefined;
    const CONFIRM_PASSWORD: string | undefined = form.get('confirmPassword')?.toString() ?? undefined;
    
    const safeEmail : string = EMAIL!
    const isRegistered : boolean = await checkUserExistanceService(safeEmail);

    // Simulação de chamada a um serviço de backend para registrar o usuário

    // Simulação de chamada a backend
    console.log("Registering user:", { safeEmail, USERNAME, PASSWORD, CONFIRM_PASSWORD });
    if (isRegistered) {
        return {
        errors: {},
        message: "This e-mail is already being used.",
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