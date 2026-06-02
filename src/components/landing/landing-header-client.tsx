"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/ui/app-logo";
import { getUserIdClient } from "@/lib/utils";
import { useState } from "react";


export default function LandingHeaderClient() {
  const [path, setPath] = useState("");

  const userIsLoggedIn = !!getUserIdClient();
  function handleLogoClick() {
    if (window.history.length > 1) {
      userIsLoggedIn ? setPath("/dashboard") : setPath("/");
    } else {
      setPath("/");
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-neutral-200 blackdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <button onClick={handleLogoClick}>
          <AppLogo href={path} textColor="text-gray-900" />
        </button>

        {!userIsLoggedIn && (
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="hidden text-lg font-medium text-neutral-600 hover:text-blue-500 sm:inline-block"
            >
              Sign In
            </Link>

            <Button
              asChild
              variant="ghost"
              className="bg-blue-600 text-lg text-white hover:bg-blue-700"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}