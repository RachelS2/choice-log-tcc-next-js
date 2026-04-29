"use client"

import Link from "next/link"
import { Button } from '@/components/ui/button';
import AppLogo from "@/components/ui/app-logo";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <AppLogo href="/" textColor="text-gray-900" />

        <nav className="flex items-center gap-2 sm:gap-4">

          <Link
            href="/login"
            className="hidden text-lg font-medium text-neutral-600 transition-colors hover:text-blue-500 sm:inline-block"
          >
            Log In
          </Link>

          <Button
            asChild
            variant="ghost"
            className="bg-blue-600 text-lg text-white shadow-sm transition-all hover:bg-blue-700"
          >
            <Link  href="/sign-up">Create Account</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}