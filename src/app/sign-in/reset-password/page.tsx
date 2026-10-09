import LandingHeaderClient from "@/components/landing/landing-header-client";
import { ResetPasswordForm } from "@/components/sign-in/reset-password/page";
import { Suspense } from "react";
import { Footer } from "react-day-picker";

export default function ResetPasswordRequestPage() {

    return (
        <main className="min-h-screen">

            <LandingHeaderClient userIsLoggedIn={false} />
            <div className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-4">

                <Suspense fallback={<ResetPasswordFormFallback />}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}

function ResetPasswordFormFallback() {
    return (
        <div className="min-h-[420px] min-w-0 rounded-xl bg-white p-8 shadow-sm lg:min-w-[420px]">
            <div className="animate-pulse space-y-4">
                <div className="h-7 w-48 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-10 w-full rounded bg-slate-100" />
                <div className="h-10 w-full rounded bg-slate-100" />
            </div>
        </div>
    );
}