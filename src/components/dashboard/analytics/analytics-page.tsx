"use client";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ExpensesByCategoryGraph from "./graphs/spences-x-satisfaction-graph";
import ExperiencesInfluencesGraph from "./graphs/experiences-influences-graph";
import NegativeAspectSpendingGraph from "./graphs/negative-aspects-spending-graph";
import ConsumptionReasonGraph from "./graphs/consumption-reason-graph";
import SpendingSatisfactionOverTimeGraph from "./graphs/satisfaction-x-time-graph";
import { buildAnalytics } from "@/lib/analytics-utils";
import { useState, useMemo } from "react";
import { ConsumptionFilterState, defaultFilters, filterConsumptions } from "@/lib/consumption-filters-utils";
import AnalyticsInsightsSection from "./insights/analytics-insights-section";
import { ConsumptionFilters, ConsumptionFiltersPanel } from "../experiences/consumption-filters";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, EditConsumptionModel, NegativeAspectModel, ReadConsumptionModel, SortConsumptionsOptions } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";
import { ActiveFiltersChips } from "@/components/ui/choicelog-chips";


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
    consumptions: ReadConsumptionModel[],
    categories: CategoryModel[];
    consumptionInfluences: ConsumptionInfluenceModel[];
    consumptionReasons: ConsumptionReasonModel[],
}
export default function AnalyticsPageComponent({ consumptions, categories, consumptionInfluences,
    consumptionReasons }: AnalyticsProps) {
    const [filters, setFilters] =
        useState<ConsumptionFilterState>(defaultFilters);

    function patchFilters(patch: Partial<ConsumptionFilterState>) {
        setFilters((prev) => ({ ...prev, ...patch }));
    }

    const filteredConsumptions = useMemo(() => {
        return filterConsumptions(consumptions, filters);
    }, [consumptions, filters]);

    const data = useMemo(() => {
        return buildAnalytics(filteredConsumptions);
    }, [filteredConsumptions]);
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    return (

        <div className="mx-auto w-full max-w-[1600px] space-y-5 p-5 lg:p-6">

            {/* INSIGHTS */}

            <section className="space-y-3 pt-8">
                <AnalyticsInsightsSection insights={data.insights} totalExperiences={data.totalExperiences} />
            </section>

            {/* CHARTS ROW 1 */}
            <div className="mt-6 border-b border-border" />

            {/* Filtros expandidos */}
            <ConsumptionFilters
                filters={filters}
                onChange={patchFilters}
                expanded={filtersExpanded}
                setExpanded={setFiltersExpanded}
            />

            {filtersExpanded && (
                <div className="pt-6">
                    <ConsumptionFiltersPanel
                        consumptionInfluences={consumptionInfluences}
                        consumptionReasons={consumptionReasons}
                        filters={filters}
                        onChange={patchFilters}
                        categories={categories}
                    />
                </div>
            )}
            <div className="mt-5">
                <ActiveFiltersChips chips={chips} />
            </div>
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