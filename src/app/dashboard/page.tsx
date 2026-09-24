import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RecentExperiences from "@/components/dashboard/recent-experiences";
import Link from 'next/link'
import { Card, CardDescription } from "@/components/ui/card";
import { calculateAverageRating, calculateRepurchaseRate, calculateTotalSpent } from "@/lib/dashboard-utils";
import { fetchConsumptionRepository } from "@/lib/repository/consumption-repository";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { calculateSatisfactionByCategory, calculateExperiencesByCategory } from "@/lib/analytics-utils";
import { AvaliacaoMediaMetricCard, BuyAgainMetricCard, MostLikedCategoryMetricCard, MostSpentCategoryMetricCard } from "@/components/dashboard/summary-metric-cards";
import ChartSection from "@/components/dashboard/chart-section";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  const username: string = session.user.name || "user";
  const userId: string = session.user.id;
  const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(userId);
  const averageRating: number = calculateAverageRating(consumptions);
  const repurchaseRate = calculateRepurchaseRate(consumptions);
  const totalSpent = calculateTotalSpent(consumptions);
  const mostConsumedCategory = calculateExperiencesByCategory(consumptions)[0];
  const bestRatedCategory = calculateSatisfactionByCategory(consumptions)[0];
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AvaliacaoMediaMetricCard avg={averageRating} />
          < BuyAgainMetricCard avg={repurchaseRate} />
          < MostLikedCategoryMetricCard data={bestRatedCategory} />
          < MostSpentCategoryMetricCard data={mostConsumedCategory} />
        </div>
        <ChartSection />
        <RecentExperiences />
      </div>
    </div>
  );
}