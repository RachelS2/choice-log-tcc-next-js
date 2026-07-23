import { Button } from "@/components/ui/button";
import { EmailNotificationContent, EmailNotificationWrapper } from "@/components/ui/e-mail-notification";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessEmailVerificationPage() {
    return <EmailNotificationWrapper>
        <EmailNotificationContent
            icon={MailCheck}
            title="E-mail Verified"
            description={
                <>
                    Your e-mail has been verified successfully!
                </>
            }
            footer="You can now use all the ChoiceLog features."
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