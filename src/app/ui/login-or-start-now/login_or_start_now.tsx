import AppLogo from '@/app/ui/app-logo';
import Link from 'next/link';
import {LoginForm} from '../../login/login-form';
import {StartNowForm} from '../../start-now/start-now-form';
import { Header } from '@/app/header';
import { AuthFormState } from '@/services/auth/auth-form-state';

type LoginOrStartNowProps = {
  onClick: (
    prevState: AuthFormState,
    formData: FormData
  ) => Promise<AuthFormState>;
  isLoginForm?: boolean;
};


export default function  ({ isLoginForm = true, onClick}: LoginOrStartNowProps) {
    let subTitle: string = "Log in to register your shopping decisions.";
    let mainTitle: string = "Welcome back!";
    let callToAction : string = "Still don't have an account?";
    let linkText: string = "Subscribe here";
    let href: "/start-now" | "/login" = "/start-now";
    if (!isLoginForm) {
        
        mainTitle = "Create your account";
        subTitle = "Join us to keep your decisions tracked.";
        callToAction = "Already have an account?";
        linkText = "Log in here";
        href = "/login";
    }
    return (
    <>
        <Header />
        <main className="flex w-full max-w-md justify-center pt-[100px]">
            {/* <div className="flex flex-col items-center  w-full gap-6"> */}

                <AppLogo textColor="text-darkBlue" />

                {/* Caixa de login */}
                <div className="w-full bg-offWhite rounded-xl pt-2 pb-8 shadow-lg md:p-4 space-y-3">

                    {/* Título e subtítulo */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-blue">{mainTitle}</h2>
                        <p className="text-xl text-darkGray mt-1">
                        {subTitle}
                        </p>
                    </div>

                    {/* Formulário */}
                    {isLoginForm ? (
                        <LoginForm onFormAction={onClick} />
                    ) : (
                        <StartNowForm onFormAction={onClick} />
                    )}

                    {/* Rodapé */}
                    <div>
                        <p className="text-center text-darkBlue">
                        {callToAction}{" "}
                        <Link
                            href={href}
                            className="font-semibold cursor-pointer hover:underline"
                        >
                            {linkText}
                        </Link>
                        </p>

                        <p className="block w-full text-center text-s text-darkBlue border-t pt-2 mt-2">
                        A safe platform to keep your decisions tracked.
                        </p>
                    </div>

                </div>
            {/* </div> */}
        </main>

    </>
    );

}
