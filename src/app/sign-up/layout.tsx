import Footer from "@/components/landing/footer";
import LandingHeaderClient from "@/components/landing/landing-header-client";

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <LandingHeaderClient userIsLoggedIn={false} />
            <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 pt-16">
                {children}
            </main>

            <Footer />
        </>
    );
}
