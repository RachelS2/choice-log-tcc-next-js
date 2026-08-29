import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SummaryCards from "@/components/dashboard/summary-cards";
import ChartSection from "@/components/dashboard/chart-section";
import RecentExperiences from "@/components/dashboard/recent-experiences";
import Link from 'next/link'
import { Card, CardAction, CardDescription } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  const username: string = session.user.name || "user";
  return (
    <div className="p-11 space-y-6 rounded-ful">

      {/* Content */}
      <div className="relative z-10 space-y-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Olá, {username} 👋
        </h1>

        <Card className="rounded-2xl bg-white p-6 shadow">
          <div className="flex flex-col items-center gap-4 text-center">
            <CardDescription className="text-base text-black">
              Registre e reflita sobre sua última decisão de consumo.
            </CardDescription>

            <Link
              href="/dashboard/experiences/new-experience"
              className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              + Nova experiência
            </Link>
          </div>
        </Card>

        <SummaryCards />
        <ChartSection />
        <RecentExperiences />
      </div>
    </div>
  );
}