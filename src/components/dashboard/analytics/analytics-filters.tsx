"use client";
import {
  activeFilterCount,
  type ConsumptionFilterState,
} from "@/lib/consumption-filters-utils";
import { CategoryFilter, ConsumptionPeriodFilter, ConsumptionReasonFilter, ItemTypeFilter, ConsumptionsOrderByFilter, RatingFilter, WouldBuyAgainFilter, ConsumptionInfluenceFilter, SearchFilter, OrderByFilter, CONSUMPTION_SORT_OPTIONS } from "@/components/ui/choicelog-filter-options";
import { CategoryModel } from "@/models/dashboard/items";
import { FiltersPanel } from "@/components/ui/choicelog-filter-painel";

interface AnalyticsFiltersPanelProps {
  filters: ConsumptionFilterState;
  onChange: (patch: Partial<ConsumptionFilterState>) => void;
  categories: CategoryModel[];
}

export function AnalyticsFiltersPanel({ filters, onChange, categories }: AnalyticsFiltersPanelProps) {
  return (
    <FiltersPanel>
      <ItemTypeFilter
        value={filters.type}
        onChange={(type) =>
          onChange({ type: type as ConsumptionFilterState["type"] })
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
          onChange({ period: period as ConsumptionFilterState["period"] })
        }
      />

    </FiltersPanel>
  )
}


// interface AnalyticsFiltersProps {
//   filters: ConsumptionFilterState;
//   onChange: (patch: Partial<ConsumptionFilterState>) => void;
//   expanded: boolean;
//   setExpanded: (expanded: boolean) => void;
// }

// export function AnalyticsFilters({
//   filters,
//   onChange,
//   expanded,
//   setExpanded,
// }: AnalyticsFiltersProps) {
//   const count = activeFilterCount(filters);

//   function onButtonClick() {
//     redirect("/dashboard/experiences/new-experience")
//   }
//   return (
//     <FiltersSearchAndButton btnTxt={"Nova experiência"} onButtonClick={onButtonClick} count={count} setExpanded={setExpanded} expanded={expanded} filters={filters} onChange={onChange} />
//   );
// }