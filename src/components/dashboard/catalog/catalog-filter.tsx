import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortOption, TypeFilter } from '@/pages/Catalog';
import { cn } from "@/lib/utils";

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
  categories: string[];
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
            placeholder="Buscar por nome..."
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
            { value: "all", label: "Todos" },
            { value: "product", label: "Produtos" },
            { value: "service", label: "Serviços" },
          ]}
        />

        {/* Category Filter */}
        <FilterSelect
          value={categoryFilter}
          placeholder="Categoria"
          onChange={onCategoryFilterChange}
          options={[
            { value: "all", label: "Todas as categorias" },
            ...categories.map((cat) => ({ value: cat, label: cat })),
          ]}
        />


        {/* Brand Filter */}
        <FilterSelect
          value={brandFilter}
          placeholder="Marca"
          onChange={onBrandFilterChange}
          options={[
            { value: "all", label: "Todas as marcas" },
            ...brands.map((brand) => ({ value: brand, label: brand })),
          ]}
        />

        {/* Sort */}
        <FilterSelect
          value={sort}
          placeholder="Ordenar"
          onChange={(v) => onSortChange(v as SortOption)}
          options={[
            { value: "recent", label: "Adicionados recentemente" },
            { value: "last_consumed", label: "Último consumo" },
            { value: "most_experiences", label: "Mais experiências" },
            { value: "alphabetical", label: "Alfabética" },
          ]}
        />
      </div>
    </div >
  );
}

interface Option {
  value: string;
  label: string;
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
  return (
    <div className="flex-1">

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "h-11 w-full ",
            value === "all" || value === "recent"
              ? "text-muted-foreground"
              : "text-gray-900"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent sideOffset={1} position="popper">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}