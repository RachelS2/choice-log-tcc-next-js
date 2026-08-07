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
        <Select value={typeFilter} onValueChange={(v) => onTypeFilterChange(v as TypeFilter)}>
          <SelectTrigger
            className={cn(
              "h-11 w-full lg:w-[140px]",
              typeFilter === "all" ? "text-muted-foreground" : "text-gray-900"
            )}
          >
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="text-black" sideOffset={2} position="popper">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="product">Produtos</SelectItem>
            <SelectItem value="service">Serviços</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger
            className={cn(
              "h-11 w-full lg:w-[190px]",
              typeFilter === "all" ? "text-muted-foreground" : "text-gray-900"
            )}
          >
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent sideOffset={2} position="popper">
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select value={brandFilter} onValueChange={onBrandFilterChange}>
          <SelectTrigger
            className={cn(
              "h-11 w-full lg:w-[180px]",
              typeFilter === "all" ? "text-muted-foreground" : "text-gray-900"
            )}
          >
            <SelectValue placeholder="Marca" />
          </SelectTrigger>
          <SelectContent sideOffset={2} position="popper">
            <SelectItem value="all">Todas as marcas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger
            className={cn(
              "h-11 w-full lg:w-[250px]",
              typeFilter === "all" ? "text-muted-foreground" : "text-gray-900"
            )}
          >
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent sideOffset={2} position="popper">
            <SelectItem value="recent">Adicionados recentemente</SelectItem>
            <SelectItem value="last_consumed">Último consumo</SelectItem>
            <SelectItem value="most_experiences">Mais experiências</SelectItem>
            <SelectItem value="alphabetical">Alfabética</SelectItem>
          </SelectContent>
        </Select>
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
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-11 w-full lg:w-auto lg:min-w-fit",
          value === "all"
            ? "text-muted-foreground"
            : "text-gray-900"
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent sideOffset={2} position="popper">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}