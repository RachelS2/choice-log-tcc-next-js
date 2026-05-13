import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import Header from "@/components/dashboard/header";
import SummaryCards from "@/components/dashboard/summary-cards";
import ChartSection from "@/components/dashboard/chart-section";
import RecentExperiences from "@/components/dashboard/recent-experiences";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { Card, CardAction, CardDescription } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() } );
  if(!session) {
    redirect("/login");
  }
  const username : string = session.user.name || "usuário";
  return (
    <main className="flex-1 p-6 space-y-6">
      <Header username={username} />

      <Card className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
          <CardDescription className="text-black-900">
            Register and think about a consumption decision. 
          </CardDescription>
          <CardAction className="text-white">
            <Link
              href="/dashboard/new-experience"
              className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700"
            >
              + Nova Experiência
            </Link>
          </CardAction>
      </Card>

      <SummaryCards />
      <ChartSection />
      <RecentExperiences />
    </main>
  );
}