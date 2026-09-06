import { useState, type FormEvent } from "react";
import { Mail, MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NotificationContent } from "../../ui/choicelog-notification-card";
import Link from 'next/link'
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const { error } = await authClient.requestPasswordReset({
            email: email,
            redirectTo: "/sign-in/reset-password",
        });
        console.log("error: " + error)
        if (error) {
            let errorMessage: string | undefined = error.message;
            if (!errorMessage) {
                errorMessage = "Falha ao enviar o e-mail. Tente novamente mais tarde."
            }
            console.log("Failed to send reset password e-mail. Received status code: " + error.status);
            toast.error(errorMessage);
        } else {
            toast.success("Se houver uma conta com este e-mail, um link de redefinição de senha será enviado.");
            setSent(true);
        }
        setLoading(false);
    };

    return (
        sent ? (
            <NotificationContent
                icon={MailCheck}
                title="Verifique sua caixa de entrada"
                description={
                    <>
                        Enviamos um link de redefinição de senha para
                        <span className="font-medium"> {email || "seu e-mail"}</span>
                        . O link expira em 30 minutos.
                    </>
                }
                footer="Não recebeu? Verifique sua pasta de spam."
            >
                <Button

                    className="h-11 w-full"
                    onClick={() => setSent(false)}
                >
                    Reenviar e-mail
                </Button>
                {backToLoginButton()}
            </NotificationContent>
        ) : (
            <NotificationContent
                icon={Mail}
                title="Esqueceu sua senha?"
                description="Digite seu e-mail e enviaremos um link seguro para redefinir sua senha."
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-lg">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="voce@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-xl"
                        />
                    </div>
                    <Button type="submit" className="h-11 w-full" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar link de redefinição"}
                    </Button>
                </form>
                {backToLoginButton()}
            </NotificationContent>
        )
    );
}

function backToLoginButton() {
    return (
        <Button asChild variant="ghost" className="h-11 w-full hover:text-blue-500">
            <Link href="/sign-in">
                <ArrowLeft className="size-4" />
                Voltar ao login
            </Link>
        </Button>
    );
}