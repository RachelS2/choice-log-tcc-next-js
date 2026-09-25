import { TypeFilter } from "@/app/dashboard/catalog/items/page";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, ReadConsumptionModel } from "@/models/dashboard/consumption";
import { ActiveFilterChip } from "@/components/ui/choicelog-chips";
import { CategoryModel } from "@/models/dashboard/items";
import {  createCategoryChip, createConsumptionInfluenceChip, createConsumptionReasonChip, createCustomPeriodChip, createSearchChip, createTypeChip } from "./chips-utils";
import { PeriodFilter } from "./consumption-filters-utils";


export interface AnalyticsFilterState {
    period: PeriodFilter;
    type: TypeFilter;
    category: string;
    reasonId: string; // "all" | id
    influenceId: string; // "all" | id
}

export const defaultFilters: AnalyticsFilterState = {
    type: "ALL",
    category: "all",
    period: "all",
    reasonId: "all",
    influenceId: "all"
};


export function activeFilterCount(filters: AnalyticsFilterState) {
    let count = 0;

    if (filters.type !== "ALL") count++;
    if (filters.category !== "all") count++;
    if (filters.period !== "all") count++;
    if (filters.influenceId !== "all") count++;
    if (filters.reasonId !== "all") count++;

    return count;
}

export function filterAnalyticalConsumptions(
    consumptions: ReadConsumptionModel[],
    filters: AnalyticsFilterState
): ReadConsumptionModel[] {

    return consumptions.filter((consumption) => {


        if (
            filters.type !== "ALL" &&
            consumption.item.type !== filters.type
        ) {
            return false;
        }

        // Category
        if (
            filters.category !== "all" &&
            String(consumption.item.categoryId) !== filters.category
        ) {
            return false;
        }

        // Reason
        if (
            filters.reasonId !== "all" &&
            String(consumption.reason.id) !== filters.reasonId
        ) {
            return false;
        }

        // Influence
        if (
            filters.influenceId !== "all" &&
            String(consumption.influence.id) !== filters.influenceId
        ) {
            return false;
        }

        return true;
    });
}



interface BuildAnalyticsFilterChipsParams {
    filters: AnalyticsFilterState;
    patchFilters: (
        patch: Partial<AnalyticsFilterState>
    ) => void;
    categories: CategoryModel[],
    consumptionInfluences: ConsumptionInfluenceModel[],
    consumptionReasons: ConsumptionReasonModel[]
}

export function buildAnalyticsFilterChips({
    filters,
    patchFilters,
    categories,
    consumptionInfluences,
    consumptionReasons
}: BuildAnalyticsFilterChipsParams): ActiveFilterChip[] {
    return [

        createTypeChip(filters.type, patchFilters),

        createCategoryChip(filters.category, patchFilters, categories),

        createCustomPeriodChip(filters.period, patchFilters),

        createConsumptionInfluenceChip(filters.influenceId, patchFilters, consumptionInfluences),

        createConsumptionReasonChip(filters.reasonId, patchFilters, consumptionReasons)

    ].filter(
        (chip): chip is ActiveFilterChip =>
            chip !== null
    );
}