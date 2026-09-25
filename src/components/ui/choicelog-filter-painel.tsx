import { cn } from "@/lib/utils";
import { Card } from "./card";

interface FilterPanelProps {
    children: React.ReactNode;
    footer?: React.ReactNode;
    mainDivClassName?: string;
}

export function FiltersPanel({
    children,
    footer, mainDivClassName
}: FilterPanelProps) {
    return (
        <Card className="rounded-2xl bg-offWhite p-4 shadow-sm sm:p-5">
            <div className={cn("grid grid-cols-1 gap-4 animate-in fade-in sm:grid-cols-2 lg:grid-cols-4", mainDivClassName)}>
                {children}
            </div>

            {footer && (
                <div className="mt-4 border-t border-border pt-4">
                    {footer}
                </div>
            )}
        </Card>
    );
}