import LandingHeader from "@/components/landing/header";
import MotivationPage from "@/components/sign-up/motivation";
import SignUpForm from "@/components/sign-up/form";

export default function SignUpPage() {

  return (
    <>
      <LandingHeader />

      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 pt-15">
        <div className="grid min-h-[calc(100vh-96px)] lg:grid-cols-2">

          {/* LEFT SIDE */}
          <MotivationPage />

          {/* RIGHT SIDE */}
          <SignUpForm />
        </div>
      </main>
    </>
  );
}