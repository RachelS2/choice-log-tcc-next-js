'use client'

import SignUpForm from "@/components/sign-up/page";
export default function SignUpPage() {
  return (
    <>
      <main className="min-h-[calc(100vh-4rem)]">
        <div className="
        mx-auto
        flex
        min-h-[calc(100vh-4rem)]
        max-w-5xl
        items-center
        justify-center
        px-6
        py-8
      ">
          <SignUpForm />
        </div>
      </main>
    </>
  );
}