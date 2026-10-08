import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingHeaderClient from "@/components/landing/landing-header-client";
import Footer from "@/components/landing/footer";

export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Background */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0">

                {/* Top left */}
                <div className="absolute -top-24 left-1/4 h-[280px] w-[300px] rounded-full bg-blue-300/20 blur-3xl" />

                {/* Top right */}
                <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-300/15 blur-3xl" />

                {/* Center */}
                <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-200/10 blur-2xl" />

                {/* Bottom left */}
                <div className="absolute bottom-0 left-10 h-[280px] w-[260px] rounded-full bg-blue-200 blur-3xl" />

                {/* Bottom right */}
                <div className="absolute bottom-[-40px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />
            </div>

            <LandingHeaderClient userIsLoggedIn={false} />


            {children}

            <Footer />
        </div>
    );
}