
import { SortOption, TypeFilter } from '@/app/dashboard/catalog/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import { BrandFilter, CategoryFilter, ItemTypeFilter, OrderByFilter, SearchFilter } from '@/components/ui/choicelog-filters';

interface CatalogFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (value: TypeFilter) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  brandFilter: string;
  onBrandFilterChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
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

        <OrderByFilter sort={sort} onSortChange={onSortChange} />
        
      </div>
    </div >
  );
}