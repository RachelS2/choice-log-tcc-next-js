import {Resend} from "resend";
import VerifyEmail from "@/components/emails/verify-email";
import { User } from "better-auth";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

const resend: Resend = new Resend(process.env.RESEND_API_KEY);

type EmailVerificationProps = {
  username: string,
  email: string,
  url: string;
};

export async function emailVerification ({ username, email, url }: EmailVerificationProps) {
   
    try {
        const { data , error } = await resend.emails.send({
            from: "onboarding@resend.dev", //`${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
            to: email,
            subject: "ChoiceLog - Verify your email",
            react: VerifyEmail({ username, verifyUrl: url }),
        });

        if (error) {
        console.error("Resend error:", error);
        throw new Error(`Email send failed: ${error.message}`);
        }
    }

    catch (error) {
        console.log("Error sending verification email: " + error);
        throw error;
    }
}