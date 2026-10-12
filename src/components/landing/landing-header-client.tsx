"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import AppLogo from "@/components/ui/choicelog-app-logo";

interface LandingHeaderClientProps {
  userIsLoggedIn: boolean;
}

export default function LandingHeaderClient({
  userIsLoggedIn,
}: LandingHeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const logoHref = userIsLoggedIn ? "/dashboard" : "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <AppLogo
          href={logoHref}
          textColor="text-gray-900"
        />

        {!userIsLoggedIn && (
          <>
            {/* Navegação desktop */}
            <nav className="hidden items-center gap-4 sm:flex">
              <Link
                href="/sign-in"
                className="sm:text-md lg:text-lgfont-medium text-neutral-600 hover:text-blue-500"
              >
                Entrar
              </Link>

              <Button
                asChild
                className="h-10 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Link href="/sign-up">
                  Cadastre-se
                </Link>
              </Button>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}