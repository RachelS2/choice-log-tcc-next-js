import { TypeFilter } from "@/app/dashboard/catalog/items/page";
import { SortItemsOptions } from "@/models/dashboard/consumption";
import { ActiveFilterChip } from "@/components/ui/choicelog-chips";
import { ConsumptionReasonModel, ConsumptionInfluenceModel } from "@/models/dashboard/consumption";
import { CategoryModel, CreateUpdateItemModel } from "@/models/dashboard/items";
import { getDateTime } from "./utils";
import { createBrandChip, createCategoryChip, createSearchChip, createTypeChip } from "./chips-utils";
import { PeriodFilter } from "./consumption-filters-utils";


export interface AnalyticsFilterState {
    period: PeriodFilter;
    type: TypeFilter;
    category: string;
}

export const defaultFilters: AnalyticsFilterState = {
    type: "ALL",
    category: "all",
    period: "all",
};


export function activeFilterCount(filters: AnalyticsFilterState) {
    let count = 0;

    if (filters.type !== "ALL") count++;
    if (filters.category !== "all") count++;
    if (filters.period != "all") count++;

    return count;
}

export function filterItems(
    data: CreateUpdateItemModel[],
    filters: AnalyticsFilterState
) {

    return data.filter((item) => {


        if (
            filters.type !== "ALL" &&
            item.type !== filters.type
        ) {
            return false;
        }

        if (
            filters.category !== "all" &&
            item.categoryId !== filters.category
        ) {
            return false;
        }

        // if (
        //     filters.period !== "all" &&
        //     item.c !== filters.brand
        // ) {
        //     return false;
        // }

        return true;
    });
}



interface BuildAnalyticsFilterChipsParams {
    filters: AnalyticsFilterState;
    patchFilters: (
        patch: Partial<AnalyticsFilterState>
    ) => void;
    categories: CategoryModel[],
}

export function buildAnalyticsFilterChips({
    filters,
    patchFilters,
    categories,
}: BuildAnalyticsFilterChipsParams): ActiveFilterChip[] {
    return [

        createTypeChip(filters.type, patchFilters),

        createCategoryChip(filters.category, patchFilters, categories),

        createBrandChip(filters.period, patchFilters)

    ].filter(
        (chip): chip is ActiveFilterChip =>
            chip !== null
    );
}