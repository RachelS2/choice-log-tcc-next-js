'use client'
'use client'

import { useRouter } from "next/navigation";
import { FaceFrownIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import LandingHeader from "@/components/landing/header";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <LandingHeader />

      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 px-6 py-20">
        
        {/* Glow background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 30%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0, transparent 35%)",
          }}
        />

        <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md">
          
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <FaceFrownIcon className="h-10 w-10 text-white" />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-100">
            Error 404
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-blue-100">
            The page you are trying to access does not exist or may have been moved.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            
            <Button
              onClick={() => router.back()}
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <a href="/">
                Return Home
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}