import { Package, Sparkles, Wrench, Loader2, ImageIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";
import { Card } from "@/components/ui/card";

export function ItemHeroCard({
    item,
    onChange,
}: {
    item: BasicItemModel;
    onChange: () => void;
}) {
    const isService = item.type === "SERVICE";

    return (
        <Card className="rounded-2xl flex items-center border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center gap-8 p-5 sm:p-6">
                {/* Item image */}
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.friendlyName}
                        loading="lazy"
                        className="size-20 shrink-0 rounded-xl object-cover sm:size-24"
                    />
                ) : (
                    <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600 shadow-md text-xl font-semibold sm:size-24 sm:text-2xl">
                        {getInitials(item.friendlyName)}
                    </div>
                )}

                {/* Item information */}
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        You consumed...
                    </p>

                    {/* Title + Change */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <button
                            type="button"
                            onClick={onChange}
                            className="
    min-w-0
    cursor-pointer
    truncate
    text-left
    text-xl
    font-semibold
    tracking-tight
    text-blue-500
    transition-all
    duration-200
    hover:text-blue-600
    hover:-translate-y-0.5
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-blue-500/40
    focus-visible:ring-offset-2
    sm:text-2xl
  "
                            style={{
                                textShadow:
                                    "0 3px 0 #dbeafe, 0 6px 12px rgba(37, 99, 235, 0.2)",
                            }}
                        >
                            {item.friendlyName}
                        </button>
                    </div>

                    {/* Brand */}
                    {item.brand && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.brand}
                        </p>
                    )}

                    {/* Metadata */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-border px-2.5 py-1 text-xs shadow-md font-medium text-muted-foreground">
                            {item.categoryName}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-800 shadow-md px-2.5 py-1 text-xs font-medium text-blue-50">
                            {isService ? (
                                <Wrench className="size-3.5" />
                            ) : (
                                <Package className="size-3.5" />
                            )}

                            {isService ? "Service" : "Product"}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}