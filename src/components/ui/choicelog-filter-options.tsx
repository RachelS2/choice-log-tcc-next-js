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

export interface BaseFilterProps<T extends string | undefined = string> {
  value: T;
  onChange: (value: T) => void;
}

export function SearchFilter({ value, onChange, placeholder }: BaseFilterProps<string> & { placeholder?: string }) {
  return (
    <div className="relative flex-1 min-w-0 lg:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <Input
        placeholder={placeholder || "Pesquisar por nome..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 text-black bg-white"
      />
    </div>
  )
}


export function ItemTypeFilter({ value, onChange }: BaseFilterProps<string>) {
  return (
    <FilterSelect
      label={"Tipo"}
      value={value}
      placeholder="Selecione o tipo dos itens consumidos..."
      onChange={onChange}
      options={[
        { value: "ALL", label: "Todos" },
        { value: "PRODUCT", label: formatItemTypeLabel("PRODUCT") },
        { value: "SERVICE", label: formatItemTypeLabel("SERVICE") },
      ]}
    />
  )
}

interface CategoryFilterProps<T extends string>
  extends BaseFilterProps<T> {
  options: CategoryModel[];
}

export function CategoryFilter({ value, onChange, options }: CategoryFilterProps<string>) {
  return (
    <FilterSelect
      value={value}
      label={"Categoria"}
      placeholder="Selecione uma categoria..."
      onChange={onChange}
      options={[
        { value: "ALL", label: "Todas as categorias" },

        ...[...options]
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

export function RatingFilter({ value, onChange }: BaseFilterProps<string>) {
  return (
    <FilterSelect label={"Avaliação"} value={value} placeholder="Selecione a avaliação..." onChange={onChange} options={[
      { value: "all", label: "Todas as avaliações" },
      { value: "5", label: "5 estrelas" },
      { value: "4", label: "4 estrelas ou mais" },
      { value: "3", label: "3 estrelas ou mais" },
      { value: "2", label: "2 estrelas ou mais" },
      { value: "1", label: "1 estrela ou mais" },
    ]} />

  )
}

export const CONSUMPTION_SORT_OPTIONS: FilterOption<SortConsumptionsOptions>[] = [
  { value: "recent", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigos" },
  { value: "rating_desc", label: "Maior avaliação" },
  { value: "rating_asc", label: "Menor avaliação" },
  { value: "most_spent", label: "Maior valor" },
  { value: "least_spent", label: "Menor valor" },
];

export const ITEM_SORT_OPTIONS: FilterOption<SortItemsOptions>[] = [
  { value: "recent", label: "Adicionados recentemente" },
  { value: "last_consumed", label: "Último consumo" },
  { value: "most_experiences", label: "Mais experiências" },
  { value: "most_spent", label: "Mais gastos" },
  { value: "alphabetical", label: "Ordem alfabética" },
];

interface OrderByFilterProps<T extends string>
  extends BaseFilterProps<T> {
  options: FilterOption<T>[];
}

export function OrderByFilter<T extends string>({
  value,
  onChange,
  options,
}: OrderByFilterProps<T>) {
  return (
    <FilterSelect
      label="Ordenar por"
      value={value}
      placeholder="Ordenar por"
      onChange={onChange}
      options={options}
    />
  );
}


interface ConsumptionInfluenceFilterProps
  extends BaseFilterProps {
  influences: ConsumptionInfluenceModel[];
}

export function ConsumptionInfluenceFilter({
  value,
  onChange,
  influences,
}: ConsumptionInfluenceFilterProps) {
  return (
    <FilterSelect
      label="Influência"
      value={value}
      placeholder="Selecione uma influência..."
      onChange={onChange}
      options={influences.map((influence) => ({
        value: String(influence.id),
        label: influence.friendlyName,
      }))}
    />
  );
}

interface ConsumptionReasonFilterProps
  extends BaseFilterProps {
  consumptionReasons: ConsumptionReasonModel[];
}

export function ConsumptionReasonFilter({
  value,
  onChange,
  consumptionReasons,
}: ConsumptionReasonFilterProps) {
  return (
    <FilterSelect
      label="Motivo do consumo"
      value={value}
      placeholder="Selecione um motivo..."
      onChange={onChange}
      options={consumptionReasons.map((reason) => ({
        value: String(reason.id),
        label: reason.friendlyName,
      }))}
    />
  );
}

export function WouldBuyAgainFilter({
  value,
  onChange,
}: BaseFilterProps) {
  return (
    <FilterSelect
      label="Compraria novamente?"
      value={value}
      placeholder="Selecione uma opção..."
      onChange={onChange}
      options={[
        { value: "all", label: "Todos" },
        { value: "yes", label: "Sim" },
        { value: "no", label: "Não" },
      ]}
    />
  );
}

export function ConsumptionPeriodFilter({
  value,
  onChange,
}: BaseFilterProps) {
  return (
    <FilterSelect
      label="Período"
      value={value}
      placeholder="Selecione o período..."
      onChange={onChange}
      options={[
        { value: "all", label: "Todos" },
        { value: "7d", label: "Últimos 7 dias" },
        { value: "30d", label: "Últimos 30 dias" },
        { value: "6m", label: "Últimos 6 meses" },
        { value: "1y", label: "Último ano" },
        { value: "custom", label: "Personalizado" },
      ]}
    />
  );
}

interface BrandFilterProps
  extends BaseFilterProps {
  brands: string[];
}


export function BrandFilter({ value,
  onChange,
  brands
}: BrandFilterProps) {
  return (<FilterSelect
    value={value}
    label={"Marca"}
    placeholder="Selecione uma marca..."
    onChange={onChange}
    options={[
      { value: "ALL", label: "Todas as marcas" },
      ...brands.map((brand) => ({ value: brand, label: brand })),
    ]}
  />)
}


export function ConsumptionsOrderByFilter({ value,
  onChange,
}: BaseFilterProps) {
  return (
    <FilterSelect
      label={"Ordenar por"}
      value={value}
      placeholder="Ordenar por"
      onChange={onChange}
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

export function ItensOrderByFilter({ value, onChange }: BaseFilterProps) {
  return (
    <FilterSelect
      label={"Ordenar por"}
      value={value}
      placeholder="Ordenar por"
      onChange={onChange}
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

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
  type?: TypeFilter;
}

interface FilterSelectProps<T extends string> {
  label: string;
  value: T;
  placeholder: string;
  onChange: (value: T) => void;
  options: FilterOption<T>[];
}

function FilterSelect<T extends string>({
  label,
  value,
  placeholder,
  onChange,
  options,
}: FilterSelectProps<T>) {
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