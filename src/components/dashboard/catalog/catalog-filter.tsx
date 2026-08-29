import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, formatItemTypeLabel } from "@/lib/utils";
import { SortOption, TypeFilter } from '@/app/dashboard/catalog/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import React from 'react';

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
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0 lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 text-black"
          />
        </div>

        {/* Type Filter */}

        <FilterSelect
          value={typeFilter}
          placeholder="Tipo"
          onChange={(v) => onTypeFilterChange(v as TypeFilter)}
          options={[
            { value: "ALL", label: "Todos" },
            { value: "PRODUCT", label: formatItemTypeLabel("PRODUCT") },
            { value: "SERVICE", label: formatItemTypeLabel("SERVICE") },
          ]}
        />

        {/* Category Filter */}
        <FilterSelect
          value={categoryFilter}
          placeholder="Categoria"
          onChange={onCategoryFilterChange}
          options={[
            { value: "ALL", label: "Todas as categorias" },

            ...[...categories]
              .sort((a, b) => {
                if (a.type === b.type) {
                  return a.name.localeCompare(b.name);
                }

                return a.type === "PRODUCT" ? -1 : 1;
              })
              .map((cat) => ({
                value: cat.id,
                label: cat.name,
                type: cat.type,
              })),
          ]}
        />


        {/* Brand Filter */}
        <FilterSelect
          value={brandFilter}
          placeholder="Marca"
          onChange={onBrandFilterChange}
          options={[
            { value: "ALL", label: "Todas as marcas" },
            ...brands.map((brand) => ({ value: brand, label: brand })),
          ]}
        />

        {/* Sort */}
        <FilterSelect
          value={sort}
          placeholder="Ordenar por"
          onChange={(v) => onSortChange(v as SortOption)}
          options={[
            { value: "recent", label: "Adicionados recentemente" },
            { value: "last_consumed", label: "Último consumo" },
            { value: "most_experiences", label: "Mais experiências" },
            { value: "most_spent", label: "Mais gastos" },
            { value: "alphabetical", label: "Ordem alfabética" },
          ]}
        />
      </div>
    </div >
  );
}

interface Option {
  value: string;
  label: string;
  type?: TypeFilter;
}

interface FilterSelectProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  options: Option[];
}
function FilterSelect({
  value,
  placeholder,
  onChange,
  options,
}: FilterSelectProps) {
  let previousType: string | undefined;

  return (
    <div className="flex-1">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "h-11 w-full",
            value === "ALL" || value === "recent"
              ? "text-muted-foreground"
              : "text-gray-900"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent sideOffset={1} position="popper"
          className="max-h-100 overflow-y-auto">
          {options.map((option) => {
            const showGroupHeader =
              option.type && option.type !== previousType;

            previousType = option.type;

            return (
              <React.Fragment key={option.value}>
                {showGroupHeader && (
                  <div className="px-2 py-1.5 text-[14px] font-semibold uppercase tracking-wider text-blue-900">
                    {option.type === "PRODUCT" ? "Categorias de produtos" : "Categorias de serviços"}
                  </div>
                )}

                <SelectItem value={option.value}>
                  {option.label}
                </SelectItem>
              </React.Fragment>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}