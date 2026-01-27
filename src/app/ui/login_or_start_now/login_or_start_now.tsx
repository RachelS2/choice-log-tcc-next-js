import AppLogo from '@/app/ui/app_logo';
import Link from 'next/link';
import Form from './login_form';
import { Button } from '../button';
import { UserRegisterState } from '@/validations/auth/start-now.validation';

type LoginOrStartNowProps = {
  onClick: (
    prevState: UserRegisterState,
    formData: FormData
  ) => Promise<UserRegisterState>;
  isLoginForm?: boolean;
};


type hrefType = "/start-now" | "/login";
export default function LoginOrStartNow({ isLoginForm = true, onClick: onFormAction}: LoginOrStartNowProps) {
    
    let subTitle: string = "Log in to connect with your family.";
    let mainTitle: string = "Welcome back!";
    let callToAction : string = "Still don't have an account?";
    let linkText: string = "Subscribe here";
    let href: hrefType = "/start-now";
    if (!isLoginForm) {
        
        mainTitle = "Create your account";
        subTitle = "Join us to keep your decisions tracked.";
        callToAction = "Already have an account?";
        linkText = "Log in here";
        href = "/login";
    }

    return (
        <main>
            <div className="flex flex-col items-center fixed w-full max-w-md gap-6">
                
                <AppLogo textColor="text-darkBlue" />

                {/* Caixa de login */}
                <div className="w-full bg-white rounded-xl shadow-lg md:p-4 space-y-6">
                
                {/* Título e subtítulo */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-darkGray">{mainTitle}</h2>
                    <p className="text-xl text-mediumGray mt-1">
                    {subTitle}
                    </p>
                </div>

                {/* Formulário de login */}
                <Form isLoginForm={isLoginForm} onFormAction={onFormAction} />

                <div className="">

                    {/* Link para cadastro do usuário ou login */}
                    <p className="text-center text-darkBlue">
                        {callToAction}{" "} 
                        <Link href={href} className="font-semibold cursor-pointer hover:underline">
                            {linkText}
                        </Link>
                    </p>

                    {/* Rodapé*/}
                    <p className="block w-full text-center text-s text-darkBlue border-t pt-2 mt-2">
                    A safe platform to keep your decisions tracked.
                    </p>

                </div>
                </div>
            </div>
        </main>

  );
}
