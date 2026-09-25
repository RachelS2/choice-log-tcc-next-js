"use client";

import { CategoryFilter, ConsumptionPeriodFilter, ConsumptionReasonFilter, ItemTypeFilter, ConsumptionsOrderByFilter, RatingFilter, WouldBuyAgainFilter, ConsumptionInfluenceFilter, SearchFilter, OrderByFilter, CONSUMPTION_SORT_OPTIONS } from "@/components/ui/choicelog-filter-options";
import { CategoryModel } from "@/models/dashboard/items";
import { FiltersPanel } from "@/components/ui/choicelog-filter-painel";
import { ConsumptionReasonModel, ConsumptionInfluenceModel } from "@/models/dashboard/consumption";
import { AnalyticsFilterState } from "@/lib/analytics-filters-utils";


interface AnalyticsFiltersPanelProps {
  filters: AnalyticsFilterState;
  onChange: (patch: Partial<AnalyticsFilterState>) => void;
  categories: CategoryModel[];
  consumptionReasons: ConsumptionReasonModel[];
  consumptionInfluences: ConsumptionInfluenceModel[];
}

export function AnalyticsFiltersPanel({ filters, onChange, categories, consumptionInfluences, consumptionReasons }: AnalyticsFiltersPanelProps) {
  return (
    <FiltersPanel mainDivClassName="grid grid-cols-3 gap-x-4 gap-y-4">
      <ItemTypeFilter
        value={filters.type}
        onChange={(type) =>
          onChange({ type: type as AnalyticsFilterState["type"] })
        }
      />

      <CategoryFilter
        value={filters.category}
        onChange={(category) => onChange({ category })}
        options={categories}
      />


      <ConsumptionPeriodFilter
        value={filters.period}
        onChange={(period) =>
          onChange({ period: period as AnalyticsFilterState["period"] })
        }
      />

      <ConsumptionReasonFilter
        value={filters.reasonId}
        onChange={(reasonId) => onChange({ reasonId })}
        consumptionReasons={consumptionReasons}
      />

      <ConsumptionInfluenceFilter
        value={filters.influenceId}
        onChange={(influenceId) => onChange({ influenceId })}
        influences={consumptionInfluences}
      />
    </FiltersPanel>
  )
}