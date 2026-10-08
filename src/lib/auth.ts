import { Auth, betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/forgot-password-email";
import VerifyEmail from "@/components/emails/verify-email";
import EmailVerifiedEmail from "@/components/emails/e-mail-verified";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;

if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not defined");
}

if (!resendFromEmail) {
    throw new Error("RESEND_FROM_EMAIL is not defined");
}

const resend: Resend = new Resend(resendApiKey);

const baseURL =
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

const trustedOrigins = [
    "http://localhost:3000",
    "https://choicelog.app.br",
    ...(process.env.VERCEL_URL
        ? [`https://${process.env.VERCEL_URL}`]
        : []),
];

export const auth = betterAuth({
    baseURL: baseURL,
    trustedOrigins: trustedOrigins,
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days if "Remember me" is enabled
        updateAge: 60 * 60 * 24, // Refresh session every 1 day
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        resetPasswordTokenExpiresIn: 60 * 30, // 30 minutes
        revokeSessionsOnPasswordReset: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            const { error } = await resend.emails.send({
                from: resendFromEmail,
                to: user.email,
                subject: "ChoiceLog - Reset your password",
                react: ForgotPasswordEmail({
                    username: user.name,
                    resetUrl: url,
                    userEmail: user.email,
                }),
            });
            if (error) {
                throw new Error(error.message);
            }

        },
    },

    emailVerification: {
        sendOnSignUp: true,
        expirationTime: 60 * 30, // 30 minutes
        sendVerificationEmail: async ({ user, url }) => {
            const { error } = await resend.emails.send({
                from: resendFromEmail,
                to: user.email,
                subject: "ChoiceLog - Verify your email",
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            });

            if (error) {
                throw new Error(`Email verification send failed: ${error.message}`);
            }

        },
        async afterEmailVerification(user) {
            const { error } = await resend.emails.send({
                from: resendFromEmail,
                to: user.email,
                subject: "ChoiceLog - Your account has been successfully verified!",
                react: EmailVerifiedEmail(user.name),
            });

            if (error) {
                console.error("Failed to send confirmation email:", error);
            }

        },
    }
});
