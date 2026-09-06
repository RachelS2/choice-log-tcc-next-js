"use client";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  activeFilterCount,
  type ConsumptionFilterState,
} from "@/lib/consumption-filters";
import { CategoryFilter, ConsumptionPeriodFilter, ConsumptionReasonFilter, ItemTypeFilter, ConsumptionsOrderByFilter, RatingFilter, WouldBuyAgainFilter, ConsumptionInfluenceFilter, SearchFilter } from "@/components/ui/choicelog-filters";
import { CategoryModel } from "@/models/dashboard/items";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, SortConsumptionsOptions } from "@/models/dashboard/consumption";
import { DatePicker } from "@/components/ui/choicelog-date-picker";
import { useState } from "react";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-blue-900">
        {label}
      </Label>
      {children}
    </div>
  );
}

interface ConsumptionFiltersProps {
  filters: ConsumptionFilterState;
  onChange: (patch: Partial<ConsumptionFilterState>) => void;
  sort: SortConsumptionsOptions;
  onSortChange: (s: SortConsumptionsOptions) => void;
  categories: CategoryModel[];
  consumptionInfluences: ConsumptionInfluenceModel[],
  consumptionReasons: ConsumptionReasonModel[]
}
export function ConsumptionFilters({
  filters,
  onChange,
  sort,
  onSortChange,
  categories,
  consumptionInfluences,
  consumptionReasons
}: ConsumptionFiltersProps) {
  const [fromDateError, setFromDateError] = useState<string | undefined>(undefined);
  const [toDateError, setToDateError] = useState<string | undefined>(undefined);

  const count = activeFilterCount(filters);
  const [expanded, setExpanded] = useState(false);

  const chips: { label: string; clear: () => void }[] = [];
  if (filters.search.trim())
    chips.push({
      label: `Busca: "${filters.search.trim()}"`,
      clear: () => onChange({ search: "" }),
    });
  if (filters.type !== "ALL")
    chips.push({
      label: filters.type === "PRODUCT" ? "Produtos" : "Serviços",
      clear: () => onChange({ type: "ALL" }),
    });
  if (filters.category !== "all")
    chips.push({
      label: filters.category,
      clear: () => onChange({ category: "all" }),
    });
  if (filters.rating !== "all")
    chips.push({
      label:
        filters.rating === "5"
          ? "5 estrelas"
          : `${filters.rating} estrelas ou mais`,
      clear: () => onChange({ rating: "all" }),
    });
  if (filters.period !== "all")
    chips.push({
      label:
        filters.period === "custom"
          ? "Período personalizado"
          : {
            "7d": "Últimos 7 dias",
            "30d": "Últimos 30 dias",
            "6m": "Últimos 6 meses",
            "1y": "Último ano",
          }[filters.period]!,
      clear: () => onChange({ period: "all", from: undefined, to: undefined }),
    });
  if (filters.buyAgain !== "all")
    chips.push({
      label: `Compraria novamente: ${{ yes: "Sim", no: "Não" }[filters.buyAgain]
        }`,
      clear: () => onChange({ buyAgain: "all" }),
    });
  if (filters.reasonId !== "all")
    chips.push({
      label: `Motivo: ${consumptionReasons.find((r) => String(r.id) === filters.reasonId)
        ?.friendlyName ?? ""
        }`,
      clear: () => onChange({ reasonId: "all" }),
    });
  if (filters.influenceId !== "all")
    chips.push({
      label: `Influência: ${consumptionInfluences.find((i) => String(i.id) === filters.influenceId)
        ?.friendlyName ?? ""
        }`,
      clear: () => onChange({ influenceId: "all" }),
    });

  return (
    <Card
      className="rounded-2xl bg-none  p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex flex-1 items-center">
          <SearchFilter search={filters.search} placeholder="Buscar por produto, serviço ou marca..." onSearchChange={(value) => onChange({ search: value })} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="h-11 flex-1 bg-white text-blue-900 hover:bg-foreground hover:text-blue-900 lg:flex-none"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <SlidersHorizontal className="size-4" />
            Filtros
            {count > 0 ? (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Button>

          <Button asChild className="h-11 bg-blue-800 hover:bg-blue-900 text-white hover:text-white">
            <Link href="/dashboard/experiences/new-experience">
              <Plus className="size-4" />
              Registrar consumo
            </Link>
          </Button>

        </div>
      </div>

      {expanded ? (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 duration-200 animate-in fade-in sm:grid-cols-2 lg:grid-cols-4">
          <ItemTypeFilter typeFilter={filters.type} onTypeFilterChange={(v) => onChange({ type: v })} />

          <CategoryFilter categoryFilter={filters.category} onCategoryFilterChange={(v) => onChange({ category: v as never })} categories={categories} />

          <RatingFilter ratingFilter={filters.rating} onRatingFilterChange={(v) => onChange({ rating: v as never })} />

          <ConsumptionPeriodFilter periodFilter={filters.period} onPeriodFilterChange={(v) => onChange({ period: v as never })} />

          <ConsumptionsOrderByFilter sort={sort} onSortChange={onSortChange} />

          {filters.period === "custom" ? (
            <>
              <Field label="De">

                <DatePicker error={fromDateError}
                  setError={(error: string | undefined) =>
                    setFromDateError(error)
                  } value={filters.from} onChange={(date) => onChange({ from: date })} putCalendarIcon={true} />

              </Field>
              <Field label="Até">

                <DatePicker error={toDateError}
                  setError={(error: string | undefined) =>
                    setToDateError(error)
                  } value={filters.to} onChange={(date) => onChange({ to: date })} putCalendarIcon={true} />
              </Field>
            </>
          ) : null}

          <WouldBuyAgainFilter buyAgainFilter={filters.buyAgain} onBuyAgainFilterChange={(v) => onChange({ buyAgain: v as never })} />

          <ConsumptionReasonFilter reasonFilter={filters.reasonId} onReasonFilterChange={(v) => onChange({ reasonId: v })} consumptionReasons={consumptionReasons} />

          <ConsumptionInfluenceFilter influenceFilter={filters.influenceId} onInfluenceFilterChange={(v) => onChange({ influenceId: v })} influences={consumptionInfluences} />

        </div>
      ) : null}

      {chips.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Filtros ativos:</span>
          {chips.map((chip) => (
            <Button
              key={chip.label}
              type="button"
              onClick={chip.clear}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10  px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
            >
              {chip.label}
              <X className="size-3" />
            </Button>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
