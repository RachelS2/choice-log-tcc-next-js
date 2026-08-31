import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div
            className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center"
            style={{ boxShadow: "var(--shadow-card)" }}
        >
            <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {title}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
            {action ? <div className="mt-6">{action}</div> : null}
        </div>
    );
}
