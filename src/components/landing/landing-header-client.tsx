"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/ui/choicelog-app-logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function LandingHeaderClient({ userIsLoggedIn }: { userIsLoggedIn: boolean }) {
  const [path, setPath] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Mobile menu button */}
        {!userIsLoggedIn && (
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((prev) => !prev);
            }}
            className="relative cursor-pointer z-[60] flex touch-manipulation items-center justify-center rounded-md p-3 text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 sm:hidden"
          >
            {menuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        )}

        {!userIsLoggedIn && (
          <>
            <nav className="hidden sm:flex items-center gap-2 sm:gap-4">
              <Link
                href="/sign-in"
                className="text-lg font-medium text-neutral-600 hover:text-blue-500"
              >
                Entrar
              </Link>

              <Button
                asChild
                variant="ghost"
                className="bg-blue-600 h-10 text-lg shadow-sm text-white hover:text-offWhite hover:bg-blue-700"
              >
                <Link href="/sign-up">Cadastre-se</Link>
              </Button>
            </nav>

            {/* Mobile stacked menu */}

            {menuOpen && (
              <div className="fixed inset-x-0 top-16 z-[55] border-b border-neutral-200 bg-white shadow-lg sm:hidden">
                <div className="flex flex-col gap-3 px-4 py-4">

                  <Button
                    asChild
                    variant="ghost"
                    className="h-10 text-lg bg-blue-800 text-white shadow-sm hover:bg-blue-900 hover:text-white"
                  >
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 text-lg font-medium text-neutral-600 hover:text-blue-500"
                    >
                      Entrar
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-10 bg-blue-600 text-lg text-white shadow-sm hover:bg-blue-700 hover:text-white"
                  >
                    <Link
                      href="/sign-up"
                      onClick={() => setMenuOpen(false)}
                    >
                      Cadastre-se
                    </Link>
                  </Button>
                </div>
              </div>
            )}

          </>
        )}
      </div>
    </header>
  );
}