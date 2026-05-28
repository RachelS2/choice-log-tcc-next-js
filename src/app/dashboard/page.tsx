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
    redirect("/login");
  }
  const username: string = session.user.name || "usuário";
  return (
    <div className="p-11 space-y-6 bg-indigo-300/20 rounded-ful">
      <h1 className="text-2xl font-bold text-blue-600">
        Hello, {username} 👋
      </h1>

      <Card className="rounded-2xl bg-white p-6 shadow">
        <div className="flex flex-col items-center gap-4 text-center">
          <CardDescription className="text-base text-black">
            Register and think about your last consumption decision.
          </CardDescription>

          <Link
            href="/dashboard/experiences/new-experience"
            className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            + New Experience
          </Link>
        </div>
      </Card>

      <SummaryCards />
      <ChartSection />
      <RecentExperiences />
    </div>
  );
}