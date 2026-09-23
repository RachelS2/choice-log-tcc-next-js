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
import { AvaliacaoMediaMetricCard, BuyAgainMetricCard, ChartCard, InsightCard, MetricCard, MostLikedCategoryMetricCard, MostSpentCategoryMetricCard } from "./analytics-small-components";
import { AnalyticsDataModel } from "@/models/dashboard/analytics";
import ExpensesByCategoryGraph from "./graphs/spences-x-satisfaction-graph";
import ExperiencesInfluencesGraph from "./graphs/experiences-influences-graph";
import NegativeAspectSpendingGraph from "./graphs/negative-aspects-spending-graph";
import ConsumptionReasonGraph from "./graphs/consumption-reason-graph";
import SpendingSatisfactionOverTimeGraph from "./graphs/satisfaction-x-time-graph";


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
    data: AnalyticsDataModel
}
export default function AnalyticsPageComponent({ data }: AnalyticsProps) {
    return (
        <div className="mx-auto w-full max-w-[1600px] space-y-5 p-5 lg:p-6">

            <section className="space-y-3">

                <PageHeader header="Visão geral" textClassName="text-md" lineBefore />


            </section>

            {/* INSIGHTS */}

            <section className="space-y-3 pt-8">
                <div className="flex items-end justify-between">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <PageHeader header="Insights sobre suas escolhas" textClassName="text-md" lineBefore />
                        <p className="text-md text-muted-foreground">
                            Alguns padrões identificados a partir das suas experiências.
                        </p>
                    </div>

                    <span className="hidden text-xs text-muted-foreground sm:block">
                        Baseado em {data.totalExperiences} experiências
                    </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <InsightCard
                        icon={<Lightbulb className="size-5 text-amber-500" />}
                        title="Pesquisa própria parece funcionar para você"
                    >
                        Experiências influenciadas por pesquisa própria tiveram avaliação
                        média de <strong>4,6</strong>, enquanto experiências associadas à
                        impulsividade tiveram média de <strong>3,1</strong>.
                    </InsightCard>

                    <InsightCard
                        icon={<AlertTriangle className="size-5 text-red-500" />}
                        title="Uma categoria merece atenção"
                    >
                        Roupas é a categoria com maior proporção de experiências que você
                        não consumiria novamente (<strong>40%</strong>).
                    </InsightCard>

                    <InsightCard
                        icon={<TrendingUp className="size-5 text-emerald-600" />}
                        title="Suas melhores experiências"
                    >
                        <strong>87%</strong> das experiências avaliadas com 4 ou 5 estrelas
                        são escolhas que você faria novamente.
                    </InsightCard>

                    <InsightCard
                        icon={<Users className="size-5 text-blue-600" />}
                        title="Suas influências mais confiáveis"
                    >
                        Experiências influenciadas por amigos e família têm avaliação média
                        de <strong>4,2</strong> e <strong>78%</strong> de recompra.
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