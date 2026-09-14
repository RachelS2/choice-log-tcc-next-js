import {
    CalendarDays,
    CircleHelp,
    Sparkles,
    ThumbsDown,
    ThumbsUp, Wallet
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ItemHero } from "@/components/ui/choicelog-item-hero";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { BasicItemModel } from "@/models/dashboard/items";
import { RatingStars } from "@/components/ui/rating-starts";
import DecorativeBackground from "@/components/ui/choicelog-decorative-background";

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
        <article className="h-full">
            <button
                type="button"
                onClick={() => onOpen(consumptionAndItem)}
                aria-label={`Ver detalhes de ${item.friendlyName}`}
                className="
      group flex min-h-[200px] w-full flex-col
      rounded-2xl border border-border bg-card
      p-4 text-left shadow-md
      transition-all duration-200 cursor-pointer
      hover:-translate-y-0.5 hover:border-blue-900
      focus-visible:ring-2 focus-visible:ring-ring/50
      focus-visible:outline-none
      sm:p-5
    "
                style={{ boxShadow: "var(--shadow-card)" }}
            >
                <DecorativeBackground />

                <ItemHero
                    item={item}
                    avatarClassName="h-18 w-18"
                    titleRight={
                        <RatingStars
                            size="xsm"
                            value={consumption.rating}
                        />
                    }
                    middleRight={
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CalendarDays className="size-3 text-blue-900" />
                            {formatDate(consumption.date.toString())}
                        </span>
                    }
                    bottomRight={
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                            <Wallet className="size-3 text-blue-900" />
                            {"R$ " + consumption.price.toFixed(2)}
                        </span>
                    }
                />

                <div
                    className="
        mt-4 flex min-h-[20px] flex-wrap
        content-start items-start
        gap-x-4 gap-y-2
        border-t border-border/60 pt-3
        text-xs text-muted-foreground
      "
                >
                    <span
                        className={cn(
                            "inline-flex items-center gap-1.5 font-medium",
                            consumption.wouldBuyAgain
                                ? "text-success"
                                : "text-destructive"
                        )}
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

                    <span className="inline-flex items-center gap-1.5">
                        <CircleHelp className="size-3.5 text-blue-900" />
                        <span>
                            Motivo:{" "}
                            <span className="font-medium text-foreground">
                                {consumption.reason.friendlyName}
                            </span>
                        </span>
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-blue-900" />
                        <span>
                            Influência:{" "}
                            <span className="font-medium text-foreground">
                                {consumption.influence.friendlyName}
                            </span>
                        </span>
                    </span>
                </div>
            </button>
        </article>
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
