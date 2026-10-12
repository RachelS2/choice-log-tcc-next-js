import { cn } from "@/lib/utils";
import { SlidersHorizontal, Plus } from "lucide-react";
import { SearchFilter } from "./choicelog-filter-options";
import { Button } from "./button";
import { ConsumptionFilterState } from "@/lib/consumption-filters-utils";
import { ItemsFilterState } from "@/lib/items-filters-utils";

interface ExpandFiltersButtonProps {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    count: number,
}


export function ExpandFiltersButton({ expanded, setExpanded, count }: ExpandFiltersButtonProps) {
    return (
        <Button
            variant="default"
            className={cn(
                "h-11 min-w-0 flex-1 justify-center gap-2 bg-white px-3 text-sm font-medium text-blue-900 transition-colors hover:bg-offWhite hover:text-blue-900 sm:flex-none",
                expanded && "bg-offWhite text-blue-900 hover:bg-offWhite-600"
            )}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
        >
            <SlidersHorizontal className="size-4 shrink-0" />

            <span className="truncate">Filtros</span>

            {count > 0 && (
                <span className="ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground">
                    {count}
                </span>
            )}
        </Button>
    )
}

interface FiltersSearchAndButtonProps extends ExpandFiltersButtonProps {
    filters: ConsumptionFilterState | ItemsFilterState;
    onChange: (patch: Partial<ConsumptionFilterState | ItemsFilterState>) => void;
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
        <div className="flex w-full min-w-0 flex-col gap-2 sm:max-w-[420px]">
            <div className="flex w-full items-center justify-end gap-2">
                <SearchFilter
                    value={filters.search}
                    placeholder="Buscar por produto, serviço ou marca..."
                    onChange={(value) => onChange({ search: value })}
                />
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <ExpandFiltersButton count={count} expanded={expanded} setExpanded={setExpanded} />

                <Button
                    onClick={onButtonClick}
                    className="h-11 w-full bg-blue-800 text-white hover:bg-blue-900 hover:text-white sm:w-auto"
                >
                    <Plus className="size-4" />
                    <span className="truncate">{btnTxt}</span>
                </Button>
            </div>
        </div>
    );
}
