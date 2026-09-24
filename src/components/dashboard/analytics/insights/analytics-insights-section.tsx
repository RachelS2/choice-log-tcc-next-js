import { PageHeader } from "@/components/ui/choicelog-pages-title";
import { Lightbulb, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { InsightCard } from "../analytics-small-components";
import BrandInsight from "./analytics-brand-insight";
import { MinimumWageSpendingInsight } from "./analytics-wage-insight";
import { AnalyticsInsightsModel } from "@/models/dashboard/analytics";

export default function AnalyticsInsightsSection({ insights, totalExperiences }: { insights: AnalyticsInsightsModel, totalExperiences: number }) {
    const favoriteItem = insights.mostConsumedItem;
    const reliableInfluence = insights.mostReliableInfluence;

    return (
        <div>
            <div className="flex items-end justify-between">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <PageHeader header="Insights sobre suas escolhas" textClassName="text-md" lineBefore />
                    <p className="text-md text-muted-foreground">
                        Alguns padrões identificados a partir das suas {totalExperiences} experiências.
                    </p>
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <InsightCard
                    icon={<Lightbulb className="size-5 text-amber-500" />}
                    title="Marcas em destaque"
                >
                    <BrandInsight brandReview={insights.brandEvaluation} />
                </InsightCard>

                <InsightCard
                    icon={<AlertTriangle className="size-5 text-red-500" />}
                    title="Uma categoria merece atenção"
                >
                    <MinimumWageSpendingInsight data={insights.minimumWagesSpent} />
                </InsightCard>

                <InsightCard
                    icon={<TrendingUp className="size-5 text-emerald-600" />}
                    title="Seu item mais consumido"
                >
                    Você consumiu o item <strong>{favoriteItem.itemName}</strong>, da marca {favoriteItem.brand}, {" "}
                    {favoriteItem.experiences} vezes, e gastou R$ {favoriteItem.totalSpent} no total.

                </InsightCard>

                <InsightCard
                    icon={<Users className="size-5 text-blue-600" />}
                    title="Sua influência mais confiável"
                >
                    Experiências influenciadas por <strong>{reliableInfluence.influence.toLowerCase()}</strong> têm
                    avaliação média de <strong>{reliableInfluence.averageRating}</strong> e <strong>{reliableInfluence.repurchaseRate}%</strong> de taxa recompra.
                </InsightCard>
            </div></div >
    )
}