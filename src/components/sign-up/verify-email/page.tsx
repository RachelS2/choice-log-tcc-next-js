import { ArrowLeft, MailCheck } from "lucide-react";
import { EmailNotificationContent, EmailNotificationWrapper } from "../../ui/e-mail-notification";
import { Button } from "../../ui/button";
import Link from "next/link";

interface VerifyEmailPageProps {
    email: string;
}
export default function VerifyEmailPage({ email }: VerifyEmailPageProps) {
    return <EmailNotificationWrapper>
        <EmailNotificationContent
            icon={MailCheck}
            title="Verify your e-mail"
            description={
                <>
                    We've sent a link to verify your e-mail to
                    <span className="font-medium"> {email}</span>
                    . The link expires in 30 minutes.
                </>
            }
            footer="Didn't receive it? Check your spam folder."
        >
            <Button asChild variant="ghost" className="h-11 w-full bg-black text-white hover:bg-blue-600">
                <Link href="/sign-in">
                    <ArrowLeft className="size-4" />
                    Go to Login
                </Link>
            </Button>
        </EmailNotificationContent>
    </EmailNotificationWrapper>
}