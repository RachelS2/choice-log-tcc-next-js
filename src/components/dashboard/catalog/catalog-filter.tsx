
import { TypeFilter } from '@/app/dashboard/catalog/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import { BrandFilter, CategoryFilter, ItemTypeFilter, ItensOrderByFilter, SearchFilter } from '@/components/ui/choicelog-filters';
import { SortItemsOptions } from '@/models/dashboard/consumption';

interface CatalogFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
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

export default function CatalogFilters({
  search,
  onSearchChange,
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
}: CatalogFiltersProps) {
  return (
    <div className="rounded-2xl 0 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

        <SearchFilter search={search} onSearchChange={onSearchChange} />

        <ItemTypeFilter typeFilter={typeFilter} onTypeFilterChange={(v) => onTypeFilterChange(v as TypeFilter)} />

        <CategoryFilter categoryFilter={categoryFilter} onCategoryFilterChange={onCategoryFilterChange} categories={categories} />

        <BrandFilter brandFilter={brandFilter} onBrandFilterChange={onBrandFilterChange} brands={brands} />

        <ItensOrderByFilter sort={sort} onSortChange={onSortChange} />
      </div>
    </div >
  );
}