'use client'

import { useRouter } from "next/navigation";
import { FaceFrownIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import LandingHeaderClient from "@/components/landing/landing-header-client";

import { Button } from "@/components/ui/button";
import { getUserIdClient } from "@/lib/utils";

export default function NotFound() {
  const router = useRouter();
  const userIsLoggedIn = !!getUserIdClient();
  console.log("User is logged in NOT FOUND:", userIsLoggedIn);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">

        {/* Top left */}
        <div className="absolute -top-24 left-1/4 h-[280px] w-[280px] rounded-full bg-blue-400/20 blur-3xl" />

        {/* Top right */}
        <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-400/20 blur-3xl" />

        {/* Center */}
        <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-400/20 blur-2xl" />

        {/* Bottom left */}
        <div className="absolute bottom-0 left-[-60px] h-[260px] w-[260px] rounded-full bg-blue-400/10 blur-3xl" />

        {/* Bottom right */}
        <div className="absolute bottom-[-40px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />

      </div>
      <LandingHeaderClient userIsLoggedIn={userIsLoggedIn} />

      <main className="flex flex-1 items-center justify-center overflow-hidden bg-blue-50 mt-16 px-6">

        <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-10 text-center shadow-2xl backdrop-blur-md">

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
    </div>
  );
}