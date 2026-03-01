import {Resend} from "resend";
import VerifyEmail from "@/components/ui/emails/verify-email";
import { User } from "better-auth";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

const resend: Resend = new Resend(process.env.RESEND_API_KEY);

type EmailVerificationProps = {
  user: User,
  url: string;
};

export async function emailVerification ({ user, url }: EmailVerificationProps) {
   
    try {
        const { data , error } = await resend.emails.send({
            from: "onboarding@resend.dev", //`${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
            to: user.email,
            subject: "ChoiceLog - Verify your email",
            react: VerifyEmail({ username: user.name, verifyUrl: url }),
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