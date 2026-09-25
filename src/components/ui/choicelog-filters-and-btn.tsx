import { cn } from "@/lib/utils";
import { SlidersHorizontal, Plus } from "lucide-react";
import { SearchFilter } from "./choicelog-filter-options";
import { Button } from "./button";
import { ConsumptionFilterState } from "@/lib/consumption-filters-utils";
import {  CatalogFilterState } from "@/lib/catalog-filters-utils";

interface ExpandFiltersButtonProps {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    count: number,
}


export function ExpandFiltersButton({ expanded, setExpanded, count }: ExpandFiltersButtonProps) {
    return (
        <Button
            variant="default"
            className={!expanded ? cn("h-11 bg-white text-blue-900 hover:bg-offWhite hover:text-blue-900") : "h-11 bg-offWhite text-blue-900 hover:bg-offWhite-600"}
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
    )
}

interface FiltersSearchAndButtonProps extends ExpandFiltersButtonProps {
    filters: ConsumptionFilterState | CatalogFilterState;
    onChange: (patch: Partial<ConsumptionFilterState | CatalogFilterState>) => void;
    onButtonClick: () => void;
    btnTxt: string,
}

export function FiltersSearchAndButton({
    filters,
    onChange,
    expanded,
    setExpanded,
    onButtonClick,
    count,
    btnTxt
}: FiltersSearchAndButtonProps) {

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
                <ExpandFiltersButton count={count} expanded={expanded} setExpanded={setExpanded} />

                <Button
                    onClick={onButtonClick}
                    className="h-11 bg-blue-800 text-white hover:bg-blue-900 hover:text-white"
                >
                    <Plus className="size-4" />
                    {btnTxt}
                </Button>
            </div>
        </div>
    );
}
