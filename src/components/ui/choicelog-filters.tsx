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
import { TypeFilter } from '@/app/dashboard/catalog/items/page';
import { CategoryModel } from '@/models/dashboard/items';
import React from 'react';
import { Label } from './label';
import { ConsumptionInfluenceModel } from '@/models/dashboard/consumption';
import { SortItemsOptions, SortConsumptionsOptions, ConsumptionReasonModel } from '@/models/dashboard/consumption';


export function SearchFilter({ search, onSearchChange, placeholder }: { search: string; onSearchChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="relative flex-1 min-w-0 lg:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <Input
        placeholder={placeholder || "Pesquisar por nome..."}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 text-black bg-white"
      />
    </div>
  )
}
export function ItemTypeFilter({ typeFilter, onTypeFilterChange }: { typeFilter: TypeFilter; onTypeFilterChange: (value: TypeFilter) => void }) {
  return (
    <FilterSelect
      label={"Tipo"}
      value={typeFilter}
      placeholder="Selecione o tipo dos itens consumidos..."
      onChange={(v) => onTypeFilterChange(v as TypeFilter)}
      options={[
        { value: "ALL", label: "Todos" },
        { value: "PRODUCT", label: formatItemTypeLabel("PRODUCT") },
        { value: "SERVICE", label: formatItemTypeLabel("SERVICE") },
      ]}
    />
  )
}

export function CategoryFilter({ categoryFilter, onCategoryFilterChange, categories }:
  { categoryFilter: string; onCategoryFilterChange: (value: string) => void; categories: CategoryModel[]; }) {
  return (
    <FilterSelect
      value={categoryFilter}
      label={"Categoria"}
      placeholder="Selecione uma categoria..."
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
            value: cat.name + " (" + formatItemTypeLabel(cat.type) + ")",
            label: cat.name,
            type: cat.type,
          })),
      ]}
    />
  )
}

export function RatingFilter({ ratingFilter, onRatingFilterChange }: { ratingFilter: string; onRatingFilterChange: (value: string) => void; }) {
  return (
    <FilterSelect label={"Avaliação"} value={ratingFilter} placeholder="Selecione a avaliação..." onChange={onRatingFilterChange} options={[
      { value: "all", label: "Todas as avaliações" },
      { value: "5", label: "5 estrelas" },
      { value: "4", label: "4 estrelas ou mais" },
      { value: "3", label: "3 estrelas ou mais" },
      { value: "2", label: "2 estrelas ou mais" },
      { value: "1", label: "1 estrela ou mais" },
    ]} />

  )
}

export function ConsumptionInfluenceFilter({ influenceFilter, onInfluenceFilterChange, influences }: {
  influenceFilter: string; onInfluenceFilterChange: (value: string) => void;
  influences: ConsumptionInfluenceModel[]
}) {
  return (

    <FilterSelect label="Motivo do consumo" onChange={onInfluenceFilterChange} placeholder="Selecione um motivo..."
      value={influenceFilter} options={influences.map((r) => ({ value: String(r.id), label: r.friendlyName }))} />

  )
}

export function ConsumptionReasonFilter({ reasonFilter, onReasonFilterChange, consumptionReasons }: {
  reasonFilter: string; onReasonFilterChange: (value: string) => void;
  consumptionReasons: ConsumptionReasonModel[]
}) {
  return (

    <FilterSelect label="Influência" onChange={onReasonFilterChange} placeholder="Selecione o que te influenciou..."
      value={reasonFilter} options={consumptionReasons.map((r) => ({ value: String(r.id), label: r.friendlyName }))} />

  )
}
export function WouldBuyAgainFilter({ buyAgainFilter, onBuyAgainFilterChange }: { buyAgainFilter: string; onBuyAgainFilterChange: (value: string) => void; }) {
  return (
    <FilterSelect
      label={"Compraria novamente?"}
      value={buyAgainFilter}
      placeholder="Selecione uma opção..."
      onChange={onBuyAgainFilterChange}
      options={[
        { value: "all", label: "Todos" },
        { value: "yes", label: "Sim" },
        { value: "no", label: "Não" },
        { value: "unknown", label: "Não informado" },
      ]} />
  )
}
export function ConsumptionPeriodFilter({ periodFilter, onPeriodFilterChange }: { periodFilter: string; onPeriodFilterChange: (value: string) => void; }) {
  return (
    <FilterSelect
      label={"Período"}
      value={periodFilter}
      placeholder="Selecione o período..."
      onChange={onPeriodFilterChange}
      options={[
        { value: "all", label: "Todos" },
        { value: "7d", label: "Últimos 7 dias" },
        { value: "30d", label: "Últimos 30 dias" },
        { value: "6m", label: "Últimos 6 meses" },
        { value: "1y", label: "Último ano" },
        { value: "custom", label: "Personalizado" },
      ]}
    />
  )
}
export function BrandFilter({ brandFilter, onBrandFilterChange, brands }: { brandFilter: string; onBrandFilterChange: (value: string) => void; brands: string[]; }) {
  return (<FilterSelect
    value={brandFilter}
    label={"Marca"}
    placeholder="Selecione uma marca..."
    onChange={onBrandFilterChange}
    options={[
      { value: "ALL", label: "Todas as marcas" },
      ...brands.map((brand) => ({ value: brand, label: brand })),
    ]}
  />)
}

export function ConsumptionsOrderByFilter({ sort, onSortChange }: { sort: SortConsumptionsOptions; onSortChange: (value: SortConsumptionsOptions) => void; }) {
  return (
    <FilterSelect
      label={"Ordenar por"}
      value={sort}
      placeholder="Ordenar por"
      onChange={(v) => onSortChange(v as SortConsumptionsOptions)}
      options={[
        { value: "recent", label: "Adicionados recentemente" },
        { value: "last_consumed", label: "Último consumo" },
        { value: "most_experiences", label: "Mais experiências" },
        { value: "most_spent", label: "Mais gastos" },
        { value: "alphabetical", label: "Ordem alfabética" },
      ]}
    />
  )
}

export function ItensOrderByFilter({ sort, onSortChange }: { sort: SortItemsOptions; onSortChange: (value: SortItemsOptions) => void; }) {
  return (
    <FilterSelect
      label={"Ordenar por"}
      value={sort}
      placeholder="Ordenar por"
      onChange={(v) => onSortChange(v as SortItemsOptions)}
      options={[
        { value: "recent", label: "Adicionados recentemente" },
        { value: "last_consumed", label: "Último consumo" },
        { value: "most_experiences", label: "Mais experiências" },
        { value: "most_spent", label: "Mais gastos" },
        { value: "alphabetical", label: "Ordem alfabética" },
      ]}
    />
  )
}

interface Option {
  value: string;
  label: string;
  type?: TypeFilter;
}

interface FilterSelectProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  options: Option[];
}

function FilterSelect({
  label,
  value,
  placeholder,
  onChange,
  options,
}: FilterSelectProps) {
  let previousType: string | undefined;

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-blue-900">
        {label}
      </Label>
      <div className="flex-1">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              "h-11 bg-white w-full",
              value === "ALL" || value === "recent"
                ? "text-muted-foreground"
                : "text-gray-900"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent sideOffset={1} position="popper"
            className="max-h-80 overflow-y-auto">
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
    </div>
  );
}

