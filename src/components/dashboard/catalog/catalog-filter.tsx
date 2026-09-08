
import { TypeFilter } from '@/app/dashboard/catalog/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import { BrandFilter, CategoryFilter, ItemTypeFilter, ItensOrderByFilter, SearchFilter } from '@/components/ui/choicelog-filter-options';
import { FiltersPanel } from '@/components/ui/choicelog-filter-painel';
import { SortItemsOptions } from '@/models/dashboard/consumption';
import { Button } from '@/components/ui/button';
import { Plus, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { activeFilterCount } from '@/lib/catalog-filters';
import { CatalogFilterState } from '@/lib/catalog-filters';
import { cn } from '@/lib/utils';
import { FiltersSearchAndButton } from '@/components/ui/choicelog-filters-and-btn';



interface CatalogFiltersProps {
  filters: CatalogFilterState;
  onChange: (patch: Partial<CatalogFilterState>) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  onNewItem: () => void;
}

export function CatalogFilters({
  filters,
  onChange,
  expanded,
  setExpanded, onNewItem
}: CatalogFiltersProps) {
  const count = activeFilterCount(filters);
  return (
    <FiltersSearchAndButton btnTxt={"Novo item"} onButtonClick={onNewItem} count={count} setExpanded={setExpanded} expanded={expanded} filters={filters} onChange={onChange} />
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

        <ItemTypeFilter value={typeFilter} onChange={(v) => onTypeFilterChange(v as TypeFilter)} />

        <CategoryFilter value={categoryFilter} onChange={onCategoryFilterChange} options={categories} />

        <BrandFilter value={brandFilter} onChange={onBrandFilterChange} brands={brands} />

        <ItensOrderByFilter
          value={sort}
          onChange={(value) => onSortChange(value as SortItemsOptions)}
        />
    </FiltersPanel >

  );
}