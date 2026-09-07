
import { TypeFilter } from '@/app/dashboard/catalog/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import { BrandFilter, CategoryFilter, ItemTypeFilter, ItensOrderByFilter, SearchFilter } from '@/components/ui/choicelog-filter-options';
import { FiltersPanel } from '@/components/ui/choicelog-filter-painel';
import { SortItemsOptions } from '@/models/dashboard/consumption';
import { Button } from '@/components/ui/button';
import { Plus, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { activeFilterCount } from '@/lib/consumption-filters';



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
          className={!expanded ? cn("h-11 bg-white text-blue-900 hover:bg-foreground hover:text-blue-900") : "h-11 bg-foreground text-blue-900 hover:bg-foreground-600"}
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


interface CatalogFiltersPanelProps {
  typeFilter: TypeFilter;
  onTypeFilterChange: (value: TypeFilter) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  brandFilter: string;
  onBrandFilterChange: (value: string) => void;
  sort: SortItemsOptions;
  onSortChange: (value: SortItemsOptions) => void;
  categories: CategoryModel[];
  brands: string[];
}

export default function CatalogFiltersPanel({
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  brandFilter,
  onBrandFilterChange,
  sort,
  onSortChange,
  categories,
  brands,
}: CatalogFiltersPanelProps) {
  return (
    <FiltersPanel >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

        <ItemTypeFilter value={typeFilter} onChange={(v) => onTypeFilterChange(v as TypeFilter)} />

        <CategoryFilter value={categoryFilter} onChange={onCategoryFilterChange} options={categories} />

        <BrandFilter value={brandFilter} onChange={onBrandFilterChange} brands={brands} />

        <ItensOrderByFilter
          value={sort}
          onChange={(value) => onSortChange(value as SortItemsOptions)}
        />
      </div>
    </FiltersPanel >

  );
}