import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import SummaryCards from "@/components/dashboard/summary-cards";
import ChartSection from "@/components/dashboard/chart-section";
import RecentExperiences from "@/components/dashboard/recent-experiences";
import { Button } from "@/components/ui/button";

export default async function NewExperiencePage() {
  const session = await auth.api.getSession({ headers: await headers() } );
  if(!session) {
    redirect("/login");
  }
  const username : string = session.user.name || "usuário";
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <Header username={username} />

        {/* CTA */}
        <div className="bg-white  p-6 rounded-2xl shadow flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-darkBlue">Nova Experiência</h2>
            <p className="text-gray-500">
              Registre uma decisão de consumo recente e reflita sobre ela.
            </p>
          </div>

          <Button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700">
            + Nova Experiência
          </Button>
        </div>

        <SummaryCards />
        <ChartSection />
        <RecentExperiences />
      </main>
    </div>
  );
}