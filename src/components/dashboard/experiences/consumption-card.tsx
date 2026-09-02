import {
    CalendarDays,
    ChevronRight,
    Package,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import { ITEM_TYPE, itemInitials } from "@/lib/consumption-data";
import { formatBRL, formatDate } from "@/lib/consumptions-mock";
import { Stars } from "./stars";
import { ItemHero } from "@/components/ui/item-hero";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { BasicItemModel } from "@/models/dashboard/items";

export interface ConsumptionListProps {
    consumptionAndItem: ReadConsumptionModel;
    onOpen: (c: ReadConsumptionModel) => void;
}

export function ConsumptionCard({
    consumptionAndItem,
    onOpen,
}: ConsumptionListProps
) {
    const item: BasicItemModel = consumptionAndItem.item;
    const consumption = consumptionAndItem;

    return (
        <article>
            <button
                type="button"
                onClick={() => onOpen(consumptionAndItem)}
                aria-label={`Ver detalhes de ${item.friendlyName}`}
                className="group w-full rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-5"
                style={{ boxShadow: "var(--shadow-card)" }}
            >
                <ItemHero item={item} />

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Stars rating={consumption.rating} />
                    <span className="text-sm font-medium text-foreground">
                        {formatBRL(consumption.price)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CalendarDays className="size-3.5" />
                        {formatDate(consumption.date.toString())}
                    </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span
                        className={
                            consumption.wouldBuyAgain
                                ? "inline-flex items-center gap-1.5 font-medium text-success"
                                : "inline-flex items-center gap-1.5 font-medium text-destructive"
                        }
                    >
                        {consumption.wouldBuyAgain ? (
                            <ThumbsUp className="size-3.5" />
                        ) : (
                            <ThumbsDown className="size-3.5" />
                        )}
                        {consumption.wouldBuyAgain
                            ? "Compraria novamente"
                            : "Não compraria novamente"}
                    </span>
                    <span>Motivo: {consumption.reason.friendlyName}</span>
                    <span className="hidden sm:inline">
                        Influência: {consumption.influence.friendlyName}
                    </span>
                </div>
            </button >
        </article >
    );
}

export function ConsumptionCardSkeleton() {
    return (
        <div
            className="rounded-2xl border border-border bg-card p-4 sm:p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
        >
            <div className="flex animate-pulse gap-4">
                <div className="size-16 shrink-0 rounded-xl bg-muted sm:size-20" />
                <div className="flex-1 space-y-2.5">
                    <div className="h-4 w-2/5 rounded bg-muted" />
                    <div className="h-3 w-1/4 rounded bg-muted" />
                    <div className="h-5 w-1/3 rounded-full bg-muted" />
                    <div className="h-3 w-3/5 rounded bg-muted" />
                </div>
            </div>
        </div>
    );
}
