// import { redirect, useRouter } from "next/navigation";
import { FaceFrownIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import LandingHeaderClient from "@/components/landing/landing-header-client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function NotFound() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userIsLoggedIn = !!session;

  return (
    <div className="flex min-h-screen flex-col">
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgb(148 163 184 / 0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(148 163 184 / 0.15) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 left-1/4 h-[280px] w-[280px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-400/20 blur-2xl" />
        <div className="absolute bottom-0 left-[-60px] h-[260px] w-[260px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-[-40px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <LandingHeaderClient userIsLoggedIn={userIsLoggedIn} />

      <main className="mt-16 flex flex-1 items-center justify-center overflow-hidden bg-blue-50 px-4 pb-8 pt-8 sm:px-6">
        <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-6 text-center shadow-2xl backdrop-blur-md sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 sm:mb-6 sm:h-20 sm:w-20">
            <FaceFrownIcon className="h-8 w-8 text-white sm:h-10 sm:w-10" />
          </div>

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-100 sm:text-sm">
            Erro 404
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Página não encontrada
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-blue-100 sm:mt-5 sm:text-lg">
            A página que você está tentando acessar não existe ou pode ter sido movida.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-11 w-full bg-white text-blue-700 hover:bg-blue-50 sm:w-auto"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              <a href="/dashboard">Voltar</a>
            </Button>

            {!userIsLoggedIn ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a href="/">Voltar para o início</a>
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}