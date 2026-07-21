import { useState, type FormEvent } from "react";
import { Mail, MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ForgotPasswordWrapper, ForgotPasswordMainContent } from "./forgot-password-components";
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
                errorMessage = "Failed to send e-mail. Try again later."
            }
            console.log("Failed to send reset password e-mail. Received status code: " + error.status);
            toast.error(errorMessage);
        } else {
            toast.success("Password reset email sent");
            setSent(true);
        }
        setLoading(false);
    };

    return (
        <ForgotPasswordWrapper>
            {sent ? (
                <ForgotPasswordMainContent
                    icon={MailCheck}
                    title="Check your inbox"
                    description={
                        <>
                            We've sent a password reset link to
                            <span className="font-medium"> {email || "your email address"}</span>
                            . The link expires in 30 minutes.
                        </>
                    }
                    footer="Didn't receive it? Check your spam folder."
                >
                    <Button

                        className="h-11 w-full"
                        onClick={() => setSent(false)}
                    >
                        Resend email
                    </Button>
                    {backToLoginButton()}
                </ForgotPasswordMainContent>
            ) : (
                <ForgotPasswordMainContent
                    icon={Mail}
                    title="Forgot your password?"
                    description="Enter your email address and we'll send you a secure link to reset your password."
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="you@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 text-xl"
                            />
                        </div>
                        <Button type="submit" className="h-11 w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send reset link"}
                        </Button>
                    </form>
                    {backToLoginButton()}
                </ForgotPasswordMainContent>
            )}
        </ForgotPasswordWrapper>
    );
}

function backToLoginButton() {
    return (
        <Button asChild variant="ghost" className="h-11 w-full hover:text-blue-500">
            <Link href="/sign-in">
                <ArrowLeft className="size-4" />
                Back to Login
            </Link>
        </Button>
    );
}