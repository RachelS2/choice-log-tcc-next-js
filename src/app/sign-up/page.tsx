'use client'

import MotivationPage from "@/components/sign-up/motivation_unused";
import SignUpForm from "@/components/sign-up/page";
import Footer from "@/components/landing/footer";
import LandingHeaderClient from "@/components/landing/landing-header-client";
export default function SignUpPage() {
  return (
    <>
      <main className="min-h-screen to-slate-900">
        <div className="mx-auto flex min-h-screen  max-w-5xl items-center justify-center px-6">
          <SignUpForm />
        </div>
      </main>
    </>
  );
}