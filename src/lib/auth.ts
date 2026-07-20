import { Auth, betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/forgot-password";
import VerifyEmail from "@/components/emails/verify-email";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined");
}

const resend: Resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days if "Remember me" is enabled
        updateAge: 60 * 60 * 24, // Refresh session every 1 day
    },
    emailAndPassword: {
        enabled: true,
        //requireEmailVerification: true,
        sendVerificationEmail: async ({ user, url, token }: { user: { email: string; name: string }; url: string; token?: string }, request: Request) => {

            const { error } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: user.email,
                subject: "ChoiceLog - Verify your email",
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            });

            if (error) {
                console.error("Resend error:", error);
                throw new Error(`Email send failed: ${error.message}`);
            }

        },
        sendResetPassword: async ({ user, url }) => {
            console.log("Sending reset password email to: " + user.email);
            const { error } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: user.email,
                subject: "ChoiceLog - Reset your password",
                react: ForgotPasswordEmail({
                    username: user.name,
                    resetUrl: url,
                    userEmail: user.email,
                }),
            });
            if (error) {
                console.error("Resend error:", error);
                throw new Error(`Email send failed: ${error.message}`);
            }

        },
    },
});
