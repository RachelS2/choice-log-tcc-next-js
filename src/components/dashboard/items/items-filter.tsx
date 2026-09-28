
import { TypeFilter } from '@/app/dashboard/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import { BrandFilter, CategoryFilter, ItemTypeFilter, ItensOrderByFilter, SearchFilter } from '@/components/ui/choicelog-filter-options';
import { FiltersPanel } from '@/components/ui/choicelog-filter-painel';
import { SortItemsOptions } from '@/models/dashboard/consumption';
import { activeFilterCount } from '@/lib/items-filters-utils';
import { ItemsFilterState } from '@/lib/items-filters-utils';
import { FiltersSearchAndButton } from '@/components/ui/choicelog-filters-and-btn';



interface ItemsFiltersProps {
  filters: ItemsFilterState;
  onChange: (patch: Partial<ItemsFilterState>) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  onNewItem: () => void;
}

export function ItemsFilters({
  filters,
  onChange,
  expanded,
  setExpanded, onNewItem
}: ItemsFiltersProps) {
  const count = activeFilterCount(filters);
  return (
    <FiltersSearchAndButton btnTxt={"Novo item"} onButtonClick={onNewItem} count={count} setExpanded={setExpanded} expanded={expanded} filters={filters} onChange={onChange} />
  );
}


interface ItemsFiltersPanelProps {
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

export default function ItemsFiltersPanel({
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
}: ItemsFiltersPanelProps) {
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