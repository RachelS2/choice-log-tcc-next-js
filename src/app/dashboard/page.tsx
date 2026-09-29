import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RecentExperiences from "@/components/dashboard/recent-experiences";
import Link from 'next/link'
import { calculateAverageRating, calculateRepurchaseRate, calculateTotalSpent } from "@/lib/dashboard-utils";
import { fetchConsumptionRepository } from "@/lib/repository/consumption-repository";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { calculateSatisfactionByCategory, calculateExperiencesByCategory, calculateSpendingSatisfactionOverTime } from "@/lib/analytics-utils";
import { AvaliacaoMediaMetricCard, BuyAgainMetricCard, MostLikedCategoryMetricCard, MostConsumedCategoryMetricCard } from "@/components/dashboard/summary-metric-cards";
import ChartSection from "@/components/dashboard/chart-section";
import { Button } from "@/components/ui/button";
import { CategoryValue, SatisfactionOverTimeModel } from "@/models/dashboard/analytics";
import { Plus, Sparkles } from "lucide-react";
import EmptyDashboardSection from "@/components/dashboard/empty-dashboard-section";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  const username: string = session.user.name || "user";
  const userId: string = session.user.id;
  const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(userId);

  const hasConsumptions = consumptions.length > 0;

  const productCount: number | null = hasConsumptions
    ? consumptions.filter(
      (consumption) => consumption.item.type === "PRODUCT"
    ).length
    : null;

  const serviceCount: number | null = hasConsumptions
    ? consumptions.filter(
      (consumption) => consumption.item.type === "SERVICE"
    ).length
    : null;

  const averageRating: number | null = hasConsumptions
    ? calculateAverageRating(consumptions)
    : null;

  const repurchaseRate: number | null = hasConsumptions
    ? calculateRepurchaseRate(consumptions)
    : null;

  const mostConsumedCategory: CategoryValue | null = hasConsumptions
    ? calculateExperiencesByCategory(consumptions)[0] ?? null
    : null;

  const bestRatedCategory: CategoryValue | null = hasConsumptions
    ? calculateSatisfactionByCategory(consumptions)[0] ?? null
    : null;

  const satisfactionOverTime: SatisfactionOverTimeModel[] | null = hasConsumptions
    ? calculateSpendingSatisfactionOverTime(consumptions, "month")
    : null;

  return (
    <div className="flex min-h-screen flex-col p-11">
      <div className="flex flex-1 flex-col">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-700">
              Olá, {username} 👋
            </h1>

            <p className="mt-1 mb-3 text-sm text-muted-foreground">
              {hasConsumptions
                ? "Aqui está um resumo das suas experiências de consumo."
                : "Comece registrando sua primeira experiência de consumo."}
            </p>
          </div>

          {hasConsumptions && <Button
            asChild
            className="h-11 gap-2 bg-blue-600 shadow-md hover:bg-blue-700"
          >
            <Link href="/dashboard/experiences/new-experience">
              <Plus className="size-4" />
              Nova experiência
            </Link>
          </Button>}
        </div>

        {!hasConsumptions ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyDashboardSection />
          </div>
        ) : (
          <>
            {/* Metrics */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <AvaliacaoMediaMetricCard avg={averageRating} />
              <BuyAgainMetricCard avg={repurchaseRate} />

              {bestRatedCategory && (
                <MostLikedCategoryMetricCard data={bestRatedCategory} />
              )}

              {mostConsumedCategory && (
                <MostConsumedCategoryMetricCard data={mostConsumedCategory} />
              )}
            </div>

            {satisfactionOverTime && productCount && serviceCount &&
              (<ChartSection
                satisfactionData={satisfactionOverTime}
                productCount={productCount}
                serviceCount={serviceCount}
              />)}

            <RecentExperiences />
          </>
        )}
      </div>
    </div>
  );
}