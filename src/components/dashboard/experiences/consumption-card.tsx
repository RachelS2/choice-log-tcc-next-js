import {
    CalendarDays,
    CircleHelp,
    LucideIcon,
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

    let wouldBuyAgainIcon: LucideIcon = ThumbsUp;
    let wouldBuyAgainStr: string = "Compraria novamente"
    if (!consumption.wouldBuyAgain) {
        wouldBuyAgainIcon = ThumbsDown;
        wouldBuyAgainStr = "Não compraria novamente"
    }

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
                    titleContent={
                        <RatingStars
                            size="xsm"
                            value={consumption.rating}
                        />
                    }
                    topRight={CardDetails(wouldBuyAgainIcon, wouldBuyAgainStr)}
                    middleRight={CardDetails(CalendarDays, formatDate(consumption.date.toString()))}

                    bottomRight={CardDetails(Wallet, "R$ " + consumption.price.toFixed(2))}
                />

                <div
                    className="
                    mt-4 grid
                    grid-cols-[minmax(0,1fr)_12rem]
                    gap-x-8
                    border-t border-border/60 pt-3
                    text-xs text-muted-foreground
                    "
                >
                    {/* Linha 1 / Coluna 1 */}
                    {CardDetails(
                        CircleHelp,
                        "Motivo: " + consumption.reason.friendlyName
                    )}

                    {/* Linha 2 / Coluna 1 */}
                    {CardDetails(
                        Sparkles,
                        "Influência: " + consumption.influence.friendlyName
                    )}
                </div>
            </button>
        </article>
    );
}

function CardDetails(Icon: LucideIcon, spanContent: string, className?: string) {
    return (
        <span className={cn("inline-flex text-sm items-center gap-1.5", className)}>
            <Icon className={cn("size-3.5 text-blue-900", className)} />
            <span className={cn("text-muted-foreground", className)}>
                {spanContent}
            </span>
        </span>
    )
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
