import LandingHeaderClient from "@/components/landing/landing-header-client";
import { ResetPasswordForm } from "@/components/sign-in/reset-password/page";
import { Footer } from "react-day-picker";

export default function ResetPasswordRequestPage() {

    return (
        <main className="min-h-screen">

            <LandingHeaderClient userIsLoggedIn={false} />
            <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-8xl">

                <div className="flex items-center justify-center px-6 py-10">
                    <ResetPasswordForm />
                </div>
            </div>
            <Footer />
        </main>
    );
}