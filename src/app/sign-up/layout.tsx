import Footer from "@/components/landing/footer";
import LandingHeaderClient from "@/components/landing/landing-header-client";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh flex-col">
            <LandingHeaderClient userIsLoggedIn={false} />

            <main
                className="
          flex
          min-w-0
          flex-1
          items-center
          justify-center
          bg-gradient-to-br
          from-blue-600
          via-blue-700
          to-slate-800
          px-4
          pb-8
          pt-24
          sm:px-6
          sm:pb-12
        "
            >
                {children}
            </main>

            <Footer />
        </div>
    );
}