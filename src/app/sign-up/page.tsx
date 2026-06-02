'use client'

import LandingHeaderClient from "@/components/landing/landing-header-server";
import MotivationPage from "@/components/sign-up/motivation_unused";
import SignUpForm from "@/components/sign-up/form";
import Footer from "@/components/landing/footer";
export default function SignUpPage() {
  return (
    <>
      <LandingHeaderClient />

      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 pt-15">
        <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-5xl items-center justify-center px-6 py-10">
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </>
  );
}