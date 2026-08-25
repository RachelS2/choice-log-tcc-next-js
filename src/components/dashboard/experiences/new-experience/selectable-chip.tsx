import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SelectableChip({
    selected,
    onClick,
    children,
    invalid,
}: {
    selected: boolean;
    onClick: () => void;
    children: ReactNode;
    invalid?: boolean;
}) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={onClick}
            className={cn(
                "rounded-full border cursor-pointer px-4 py-2 text-sm transition-all duration-100 shadow-sm",
                "hover:-translate-y-0.5  hover:text-blue-900 hover:border-blue-900",
                "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
                selected
                    ? "bg-blue-900 border-blue-900 text-white font-semibold shadow-sm"
                    : "border-border bg-white text-black ",
                invalid && !selected && "border-destructive/40",
            )}
        >
            {children}
        </button>
    );
}