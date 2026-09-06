import { ArrowLeft, MailCheck } from "lucide-react";
import { NotificationContent } from "../../ui/choicelog-notification-card";
import { Button } from "../../ui/button";
import Link from "next/link";

interface VerifyEmailPageProps {
    email: string;
}
export default function VerifyEmailPage({ email }: VerifyEmailPageProps) {
    return (
        <NotificationContent
            icon={MailCheck}
            title="Verifique seu e-mail"
            description={
                <>
                    Enviamos um link para verificar seu e - mail para
                    < span className="font-medium" > {email}</span >
                    .O link expira em 30 minutos.
                </>
            }
            footer="Não recebeu? Verifique sua pasta de spam.">

            <Button asChild variant="ghost" className="h-11 w-full bg-black text-white hover:bg-blue-600">
                <Link href="/sign-in">
                    <ArrowLeft className="size-4" />
                    Ir para login
                </Link>
            </Button>
        </NotificationContent >)
}