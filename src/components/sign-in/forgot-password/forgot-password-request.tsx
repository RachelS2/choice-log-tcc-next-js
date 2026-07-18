//import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ForgotPasswordWrapper, ForgotPasswordMainContent } from "./test";
import Link from 'next/link'

//import { AuthCard } from "./test";

// export const Route = createFileRoute("/forgot-password")({
//     head: () => ({
//         meta: [
//             { title: "Forgot password — ChoiceLog" },
//             {
//                 name: "description",
//                 content:
//                     "Reset your ChoiceLog password. Enter your email and we'll send you a secure reset link.",
//             },
//             { property: "og:title", content: "Forgot password — ChoiceLog" },
//             {
//                 property: "og:description",
//                 content: "Request a secure password reset link for your ChoiceLog account.",
//             },
//         ],
//     }),
//     component: ForgotPasswordPage,
// });

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock: no backend yet
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 500);
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
                            <span className="font-medium text-foreground"> {email || "your email address"}</span>
                            . The link expires in 30 minutes.
                        </>
                    }
                    footer="Didn't receive it? Check your spam folder."
                >
                    <Button
                        variant="outline"
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
                                placeholder="you@company.com"
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
        <Button asChild variant="ghost" className="h-11 w-full">
            <Link href="/sign-in">
                <ArrowLeft className="size-4" />
                Back to Login
            </Link>
        </Button>
    );
}