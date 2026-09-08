"use client";
import {
  activeFilterCount,
  type ConsumptionFilterState,
} from "@/lib/consumption-filters";
import { CategoryFilter, ConsumptionPeriodFilter, ConsumptionReasonFilter, ItemTypeFilter, ConsumptionsOrderByFilter, RatingFilter, WouldBuyAgainFilter, ConsumptionInfluenceFilter, SearchFilter, OrderByFilter, CONSUMPTION_SORT_OPTIONS } from "@/components/ui/choicelog-filter-options";
import { CategoryModel } from "@/models/dashboard/items";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, SortConsumptionsOptions } from "@/models/dashboard/consumption";
import { FiltersPanel } from "@/components/ui/choicelog-filter-painel";
import { FiltersSearchAndButton } from "@/components/ui/choicelog-filters-and-btn";
import { redirect } from "next/navigation";


interface ConsumptionFiltersProps {
  filters: ConsumptionFilterState;
  onChange: (patch: Partial<ConsumptionFilterState>) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export function ConsumptionFilters({
  filters,
  onChange,
  expanded,
  setExpanded,
}: ConsumptionFiltersProps) {
  const count = activeFilterCount(filters);

  function onButtonClick() {
    redirect("/dashboard/experiences/new-experience")
  }
  return (
    <FiltersSearchAndButton btnTxt={"Registrar consumo"} onButtonClick={onButtonClick} count={count} setExpanded={setExpanded} expanded={expanded} filters={filters} onChange={onChange} />
  );
}

interface ConsumptionFiltersPanelProps {
  filters: ConsumptionFilterState;
  onChange: (patch: Partial<ConsumptionFilterState>) => void;
  sort: SortConsumptionsOptions;
  onSortChange: (sort: SortConsumptionsOptions) => void;
  categories: CategoryModel[];
  consumptionReasons: ConsumptionReasonModel[];
  consumptionInfluences: ConsumptionInfluenceModel[];
}

export function ConsumptionFiltersPanel({ filters, onChange, sort, onSortChange, categories, consumptionReasons, consumptionInfluences }: ConsumptionFiltersPanelProps) {
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

      <RatingFilter
        value={filters.rating}
        onChange={(rating) =>
          onChange({ rating: rating as ConsumptionFilterState["rating"] })
        }
      />

      <ConsumptionPeriodFilter
        value={filters.period}
        onChange={(period) =>
          onChange({ period: period as ConsumptionFilterState["period"] })
        }
      />

      <OrderByFilter
        value={sort}
        onChange={onSortChange}
        options={CONSUMPTION_SORT_OPTIONS}
      />

      <WouldBuyAgainFilter
        value={filters.buyAgain}
        onChange={(buyAgain) =>
          onChange({
            buyAgain: buyAgain as ConsumptionFilterState["buyAgain"],
          })
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