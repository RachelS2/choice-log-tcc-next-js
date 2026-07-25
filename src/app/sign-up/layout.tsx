import Footer from "@/components/landing/footer";
import LandingHeaderClient from "@/components/landing/landing-header-client";

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <LandingHeaderClient userIsLoggedIn={false} />

            <main className="        flex-1
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-600
        via-blue-700
        to-slate-800">
                {children}
            </main>

            <Footer />
        </div>
    );
}