import { Auth, betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {Resend} from "resend";
import { emailVerification } from "@/app/api/email-verification";

export const auth : Auth<BetterAuthOptions>= betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }), 
    emailAndPassword: {
        enabled: true, 
        // requireEmailVerification: true,
    }
    // ,emailVerification: {
    //     sendVerificationEmail: async ({ user, url }) => {
    //         try {
    //             const { data , error } = await resend.emails.send({
    //                 from: "onboarding@resend.dev", //`${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
    //                 to: user.email,
    //                 subject: "ChoiceLog - Verify your email",
    //                 react: VerifyEmail({ username: user.name, verifyUrl: url }),
    //             });
    
    //             if (error) {
    //                 console.log(error.message);
    //                 throw new Error(error.message);
    //             }
    //         }

    //         catch (error) {
    //             console.log("Error sending verification email: " + error);
    //             throw error;
    //         }
    //     },
    //     sendOnSignUp: true, }
    } 
);
