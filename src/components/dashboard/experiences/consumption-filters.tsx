"use client";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  activeFilterCount,
  type ConsumptionFilterState,
} from "@/lib/consumption-filters";
import { CategoryFilter, ConsumptionPeriodFilter, ConsumptionReasonFilter, ItemTypeFilter, ConsumptionsOrderByFilter, RatingFilter, WouldBuyAgainFilter, ConsumptionInfluenceFilter, SearchFilter, OrderByFilter, CONSUMPTION_SORT_OPTIONS } from "@/components/ui/choicelog-filter-options";
import { CategoryModel } from "@/models/dashboard/items";
import Link from "next/link";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, SortConsumptionsOptions } from "@/models/dashboard/consumption";
import { FiltersPanel } from "@/components/ui/choicelog-filter-painel";
import { cn } from "@/lib/utils";


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

  return (
    <div className="flex w-full flex-col  gap-2 lg:w-[420px]">
      <div className="flex items-center justify-end gap-2">
        <SearchFilter
          value={filters.search}
          placeholder="Buscar por produto, serviço ou marca..."
          onChange={(value) => onChange({ search: value })}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="default"
          className={!expanded ? cn("h-11 bg-white text-blue-900 hover:bg-foreground hover:text-blue-900") : "h-11 bg-foreground text-blue-900 hover:bg-foreground-600" }
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <SlidersHorizontal className="size-4" />

          Filtros

          {count > 0 && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </Button>

        <Button
          asChild
          className="h-11 bg-blue-800 text-white hover:bg-blue-900 hover:text-white"
        >
          <Link href="/dashboard/experiences/new-experience">
            <Plus className="size-4" />
            Registrar consumo
          </Link>
        </Button>
      </div>
    </div>
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