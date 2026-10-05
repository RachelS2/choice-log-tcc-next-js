"use client";
import ExpensesByCategoryGraph from "./graphs/spences-x-satisfaction-graph";
import ExperiencesInfluencesGraph from "./graphs/experiences-influences-graph";
import NegativeAspectSpendingGraph from "./graphs/negative-aspects-spending-graph";
import ConsumptionReasonGraph from "./graphs/consumption-reason-graph";
import SpendingOverTimeGraph from "./graphs/spending-x-time-graph";
import { buildAnalytics } from "@/lib/analytics-utils";
import { useState, useMemo } from "react";
import AnalyticsInsightsSection from "./insights/analytics-insights-section";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, EditConsumptionModel, NegativeAspectModel, ReadConsumptionModel, SortConsumptionsOptions } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";
import { ActiveFiltersChips } from "@/components/ui/choicelog-chips";
import { AnalyticsFiltersPanel } from "./analytics-filters";
import { activeFilterCount, AnalyticsFilterState, buildAnalyticsFilterChips, defaultFilters, filterAnalyticalConsumptions } from "@/lib/analytics-filters-utils";
import { ExpandFiltersButton } from "@/components/ui/choicelog-filters-and-btn";
import { AnalyticsDataModel, AnalyticsTimeGranularity } from "@/models/dashboard/analytics";
import { NotificationContent } from "@/components/ui/choicelog-notification-card";
import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PeriodFilter } from "@/lib/consumption-filters-utils";
import { GRAPHS_COLORS } from "@/lib/utils";
import SatisfactionOverTimeGraph from "./graphs/satisfaction-x-time-graph";
import { SpendingSatisfactionScatterGraph } from "./graphs/spending-x-satisfaction-graph";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */


function getTimeGranularity(
    period: PeriodFilter
): AnalyticsTimeGranularity {
    switch (period) {
        case "7d":
        case "30d":
            return "day";

        default:
            return "month";
    }
}

interface AnalyticsProps {
    consumptions: ReadConsumptionModel[],
    categories: CategoryModel[];
    consumptionInfluences: ConsumptionInfluenceModel[];
    consumptionReasons: ConsumptionReasonModel[],
}
export default function AnalyticsPageComponent({ consumptions, categories, consumptionInfluences,
    consumptionReasons }: AnalyticsProps) {
    const [filters, setFilters] =
        useState<AnalyticsFilterState>(defaultFilters);

    function patchFilters(patch: Partial<AnalyticsFilterState>) {
        setFilters((prev) => ({ ...prev, ...patch }));
    }

    const filteredConsumptions = useMemo(() => {
        return filterAnalyticalConsumptions(consumptions, filters);
    }, [consumptions, filters]);

    const data: AnalyticsDataModel | null = useMemo(() => {
        return buildAnalytics(filteredConsumptions, getTimeGranularity(filters.period));
    }, [filteredConsumptions]);
    const [filtersExpanded, setFiltersExpanded] = useState(false);
    const count = activeFilterCount(filters);
    const dataValueColor: string = GRAPHS_COLORS[0]
    if (data == null) {
        return (
            <div className="mx-auto w-full max-w-[1600px] space-y-5 p-5 lg:p-6">
                <AnalyticFilters consumptionInfluences={consumptionInfluences}
                    consumptionReasons={consumptionReasons}
                    filters={filters} activeFiltersCount={count}
                    onChange={patchFilters} setFiltersExpanded={setFiltersExpanded} filtersExpanded={filtersExpanded}
                    categories={categories} />
                <ActiveFiltersChips chips={buildAnalyticsFilterChips({ filters, patchFilters, categories, consumptionInfluences, consumptionReasons })} />

                <NotificationContent icon={Box} title="Nada por aqui!"
                    children={

                        <Button className="bg-blue-900 text-white hover:bg-blue-800" onClick={() => {
                            patchFilters(defaultFilters)
                        }}>
                            Limpar Filtros
                        </Button>
                    }
                    description="Você não possui experiências de consumo que atendam aos filtros selecionados." />
            </div>
        )
    }
    return (

        <div className="mx-auto w-full max-w-[1600px] space-y-5 p-5 lg:p-6">

            {/* INSIGHTS */}

            <section className="space-y-3 pt-8">
                <AnalyticsInsightsSection insights={data.insights} totalExperiences={data.totalExperiences} />
            </section>

            {/* Divider */}
            <div className="mt-6 border-b border-border" />

            <AnalyticFilters consumptionInfluences={consumptionInfluences}
                consumptionReasons={consumptionReasons}
                filters={filters} activeFiltersCount={count}
                onChange={patchFilters} setFiltersExpanded={setFiltersExpanded} filtersExpanded={filtersExpanded}
                categories={categories} />

            <ActiveFiltersChips chips={buildAnalyticsFilterChips({ filters, patchFilters, categories, consumptionInfluences, consumptionReasons })} />

            <div className="grid gap-4 xl:grid-cols-2">
                <ExpensesByCategoryGraph dataValueColor={dataValueColor} colors={GRAPHS_COLORS} data={data.spendingSatisfactionByCategory} />

                <ConsumptionReasonGraph dataValueColor={"white"} colors={GRAPHS_COLORS} data={data.consumptionReason} />
            </div>

            <div className="grid gap-4 xl:grid-cols-2">

                <SpendingOverTimeGraph colors={GRAPHS_COLORS} data={data.satisfactionOverTime} />
                <SatisfactionOverTimeGraph colors={GRAPHS_COLORS} data={data.satisfactionOverTime} />

            </div>

            <div className="grid gap-4 xl:grid-cols-2">

                <ExperiencesInfluencesGraph colors={GRAPHS_COLORS} data={data.influences} dataValueColor={GRAPHS_COLORS[0]} />
                <NegativeAspectSpendingGraph dataValueColor={dataValueColor} colors={GRAPHS_COLORS} data={data.negativeAspectSpending} />

            </div>

            <div className="h-[350px] w-full">

                <SpendingSatisfactionScatterGraph data={data.spendingSatisfaction} />
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   FILTER                                   */
/* -------------------------------------------------------------------------- */

interface FilterProps {
    filtersExpanded: boolean;
    setFiltersExpanded: (expanded: boolean) => void;
    activeFiltersCount: number,
    categories: CategoryModel[];
    consumptionInfluences: ConsumptionInfluenceModel[];
    consumptionReasons: ConsumptionReasonModel[],
    filters: AnalyticsFilterState;
    onChange: (patch: Partial<AnalyticsFilterState>) => void;
}

function AnalyticFilters({ activeFiltersCount, filters, onChange, consumptionReasons, categories, consumptionInfluences, setFiltersExpanded, filtersExpanded }: FilterProps) {
    return (
        <div className="flex flex-col items-start gap-4 lg:flex-row">
            <ExpandFiltersButton
                count={activeFiltersCount}
                setExpanded={setFiltersExpanded}
                expanded={filtersExpanded}
            />

            {filtersExpanded && (
                <div className="w-full flex-1">
                    <AnalyticsFiltersPanel
                        consumptionInfluences={consumptionInfluences}
                        consumptionReasons={consumptionReasons}
                        filters={filters}
                        onChange={onChange}
                        categories={categories}
                    />
                </div>
            )}
        </div>
    );
}