import { Card } from "./card";

interface FilterPanelProps {
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function FiltersPanel({
    children,
    footer,
}: FilterPanelProps) {
    return (
        <Card className="rounded-2xl bg-background p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 animate-in fade-in sm:grid-cols-2 lg:grid-cols-4">
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