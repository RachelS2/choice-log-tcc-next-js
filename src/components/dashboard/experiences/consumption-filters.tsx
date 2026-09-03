import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  consumptionInfluences,
  consumptionReasons,
} from "@/lib/consumption-data";
import {
  activeFilterCount,
  sortLabels,
  type ConsumptionFilterState,
  type SortOption,
} from "@/lib/consumption-filters";
import { CategoryFilter, ConsumptionPeriodFilter, ConsumptionReasonFilter, ItemTypeFilter, RatingFilter, WouldBuyAgainFilter } from "@/components/ui/choicelog-filters";
import { CategoryModel } from "@/models/dashboard/items";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
export function ConsumptionFilters({
  filters,
  onChange,
  onClear,
  sort,
  onSortChange,
  expanded,
  onToggleExpanded,
  categories,
}: {
  filters: ConsumptionFilterState;
  onChange: (patch: Partial<ConsumptionFilterState>) => void;
  onClear: () => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
  categories: CategoryModel[];
}) {
  const count = activeFilterCount(filters);

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
      clear: () => onChange({ period: "all", from: "", to: "" }),
    });
  if (filters.buyAgain !== "all")
    chips.push({
      label: `Compraria novamente: ${{ yes: "Sim", no: "Não", unknown: "Não informado" }[filters.buyAgain]
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
    <section
      className="rounded-2xl border border-border bg-card p-4 sm:p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Buscar por produto, serviço ou marca..."
            aria-label="Buscar consumos"
            className="h-11 pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-11 flex-1 lg:flex-none"
            onClick={onToggleExpanded}
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

          <Select
            value={sort}
            onValueChange={(v) => onSortChange(v as SortOption)}
          >
            <SelectTrigger
              className="h-11 flex-1 lg:w-48 lg:flex-none"
              aria-label="Ordenar por"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(sortLabels) as SortOption[]).map((k) => (
                <SelectItem key={k} value={k}>
                  {sortLabels[k]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {expanded ? (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 duration-200 animate-in fade-in sm:grid-cols-2 lg:grid-cols-4">
          <ItemTypeFilter typeFilter={filters.type} onTypeFilterChange={(v) => onChange({ type: v })} />

          <CategoryFilter categoryFilter={filters.category} onCategoryFilterChange={(v) => onChange({ category: v })} categories={categories} />

          <RatingFilter ratingFilter={filters.rating} onRatingFilterChange={(v) => onChange({ rating: v as never })} />

          <ConsumptionPeriodFilter periodFilter={filters.period} onPeriodFilterChange={(v) => onChange({ period: v as never })} />


          {filters.period === "custom" ? (
            <>
              <Field label="De">
                <Input
                  type="date"
                  value={filters.from}
                  onChange={(e) => onChange({ from: e.target.value })}
                />
              </Field>
              <Field label="Até">
                <Input
                  type="date"
                  value={filters.to}
                  onChange={(e) => onChange({ to: e.target.value })}
                />
              </Field>
            </>
          ) : null}

          <WouldBuyAgainFilter buyAgainFilter={filters.buyAgain} onBuyAgainFilterChange={(v) => onChange({ buyAgain: v as never })} />

          <ConsumptionReasonFilter reasonFilter={filters.reasonId} onReasonFilterChange={(v) => onChange({ reasonId: v })} consumptionReasons={consumptionReasons} />


          <Field label="Influência">
            <Select
              value={filters.influenceId}
              onValueChange={(v) => onChange({ influenceId: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {consumptionInfluences.map((i) => (
                  <SelectItem key={i.id} value={String(i.id)}>
                    {i.friendlyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      ) : null}

      {chips.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Filtros ativos:</span>
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={chip.clear}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {chip.label}
              <X className="size-3" />
            </button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 text-xs"
          >
            Limpar filtros
          </Button>
        </div>
      ) : null}
    </section>
  );
}
