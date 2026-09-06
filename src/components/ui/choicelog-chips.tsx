import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SelectableChipProps {
    selected: boolean;
    onClick: () => void;
    children: ReactNode;
    invalid?: boolean;

    selectedClassName?: string;
    unselectedClassName?: string;
    hoverClassName?: string;
}

export function SelectableChip({
    selected,
    onClick,
    children,
    invalid,
    selectedClassName,
    unselectedClassName,
    hoverClassName,
}: SelectableChipProps) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={onClick}
            className={cn(
                "rounded-full border cursor-pointer px-4 py-2 text-sm transition-all duration-100 shadow-sm",
                "hover:-translate-y-0.5",
                "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",

                selected
                    ? cn(
                        "bg-blue-900 border-blue-800 text-white font-semibold shadow-sm",
                        selectedClassName
                    )
                    : cn(
                        "border-border bg-white text-black",
                        unselectedClassName
                    ),

                hoverClassName,

                invalid && !selected && "border-destructive/40"
            )}
        >
            {children}
        </button>
    );
}


export interface ActiveFilterChip {
    label: string;
    clear: () => void;
}

interface ActiveFiltersProps {
    chips: ActiveFilterChip[];
}

export function ActiveFiltersChips({
    chips,
}: ActiveFiltersProps) {
    if (chips.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
                Filtros ativos:
            </span>

            {chips.map((chip) => (
                <SelectableChip
                    key={chip.label}
                    selected={false}
                    onClick={chip.clear}
                    unselectedClassName="
            h-auto
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-primary/30
            bg-primary/10
            px-3
            py-1
            text-xs
            font-medium
            text-primary
            hover:bg-primary/15
            hover:text-primary
          "
                >
                    {chip.label}
                    <X className="size-3" />
                </SelectableChip>
            ))}
        </div>
    );
}

