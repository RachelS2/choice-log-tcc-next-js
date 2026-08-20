import { Package, Sparkles, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";

export function ItemHeroCard({
    item,
    onChange,
}: {
    item: BasicItemModel;
    onChange: () => void;
}) {
    const isService = item.type === "SERVICE";
    return (
        <section
            className="overflow-hidden rounded-2xl border border-border bg-card"
            style={{ boxShadow: "var(--shadow-card)" }}
        >
            <div className="flex flex-col gap-6 bg-accent/40 p-6 sm:flex-row sm:items-center sm:p-8">
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.friendlyName}
                        loading="lazy"
                        className="size-24 rounded-2xl object-cover"
                    />
                ) : (
                    <div className="grid size-24 shrink-0 place-items-center rounded-2xl border border-primary/15 bg-primary/10 text-2xl font-semibold text-primary">
                        {getInitials(item.friendlyName)}
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        What did you consume?
                    </p>
                    <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-foreground">
                        {item.friendlyName}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">{item.brand}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                            {item.categoryName}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {isService ? (
                                <Sparkles className="size-3.5" />
                            ) : (
                                <Package className="size-3.5" />
                            )}
                            {isService ? "Service" : "Product"}
                        </span>
                    </div>
                </div>

                <Button variant="outline" onClick={onChange} className="shrink-0">
                    <ChevronsUpDown className="size-4" />
                    Change item
                </Button>
            </div>
        </section>
    );
}