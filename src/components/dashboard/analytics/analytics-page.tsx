"use client";

import {
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    Users,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import { InsightCard } from "./analytics-small-components";
import ExpensesByCategoryGraph from "./graphs/spences-x-satisfaction-graph";
import ExperiencesInfluencesGraph from "./graphs/experiences-influences-graph";
import NegativeAspectSpendingGraph from "./graphs/negative-aspects-spending-graph";
import ConsumptionReasonGraph from "./graphs/consumption-reason-graph";
import SpendingSatisfactionOverTimeGraph from "./graphs/satisfaction-x-time-graph";
import BrandInsight from "./analytics-brand-insight";
import { MinimumWageSpendingInsight } from "./analytics-wage-insight";
import { buildAnalytics } from "@/lib/analytics-utils";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { useState, useMemo } from "react";
import { ConsumptionFilterState, defaultFilters, filterConsumptions } from "@/lib/consumption-filters-utils";


const COLORS = [
    "#7ba4e7",
    "#1b0277",
    "#2d4cfd",
    "#481eaa",
    "#9c35fc",
    "#5fd4e9",
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

interface AnalyticsProps {
    consumptions: ReadConsumptionModel[]
}
export default function AnalyticsPageComponent({ consumptions }: AnalyticsProps) {
    const [filters, setFilters] =
        useState<ConsumptionFilterState>(defaultFilters);

    const filteredConsumptions = useMemo(() => {
        return filterConsumptions(consumptions, filters);
    }, [consumptions, filters]);

    const data = useMemo(() => {
        return buildAnalytics(filteredConsumptions);
    }, [filteredConsumptions]);
    const reliableInfluence = data.insights.mostReliableInfluence;
    const favoriteItem = data.insights.mostConsumedItem;

    return (

        <div className="mx-auto w-full max-w-[1600px] space-y-5 p-5 lg:p-6">

            {/* INSIGHTS */}

            <section className="space-y-3 pt-8">
                <div className="flex items-end justify-between">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <PageHeader header="Insights sobre suas escolhas" textClassName="text-md" lineBefore />
                        <p className="text-md text-muted-foreground">
                            Alguns padrões identificados a partir das suas {data.totalExperiences} experiências.
                        </p>
                    </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <InsightCard
                        icon={<Lightbulb className="size-5 text-amber-500" />}
                        title="Marcas em destaque"
                    >
                        <BrandInsight brandReview={data.insights.brandEvaluation} />
                    </InsightCard>

                    <InsightCard
                        icon={<AlertTriangle className="size-5 text-red-500" />}
                        title="Uma categoria merece atenção"
                    >
                        <MinimumWageSpendingInsight data={data.insights.minimumWagesSpent} />
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
                </div>
            </section>

            {/* CHARTS ROW 1 */}

            <div className="grid gap-4 xl:grid-cols-2">
                <ExpensesByCategoryGraph colors={COLORS} data={data.spendingSatisfactionByCategory} />

                <ConsumptionReasonGraph colors={COLORS} data={data.consumptionReason} />
            </div>

            {/* INFLUENCES */}

            <div className="gap-4">

                <SpendingSatisfactionOverTimeGraph colors={COLORS} data={data.satisfactionOverTime} />

            </div>

            <div className="grid gap-4 xl:grid-cols-2">

                <ExperiencesInfluencesGraph colors={COLORS} data={data.influences} />
                <NegativeAspectSpendingGraph colors={COLORS} data={data.negativeAspectSpending} />

            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   FILTER                                   */
/* -------------------------------------------------------------------------- */

interface FilterProps {
    label: string;
    defaultValue: string;
    children: React.ReactNode;
}

function Filter({ label, defaultValue, children }: FilterProps) {
    return (
        <div className="w-full lg:w-56">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {label}
            </label>

            <Select defaultValue={defaultValue}>
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>{children}</SelectContent>
            </Select>
        </div>
    );
}