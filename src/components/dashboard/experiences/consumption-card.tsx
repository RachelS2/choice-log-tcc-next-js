import {
    CalendarDays,
    ChevronRight,
    Package,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import { ITEM_TYPE, itemInitials } from "@/lib/consumption-data";
import { formatBRL, formatDate, type Consumption } from "@/lib/consumptions-mock";
import { Stars } from "./stars";

export function ConsumptionCard({
    consumption,
    onOpen,
}: {
    consumption: Consumption;
    onOpen: (c: Consumption) => void;
}) {
    const { item } = consumption;
    const isService = item.typeId === ITEM_TYPE.SERVICE;

    return (
        <article>
            <button
                type="button"
                onClick={() => onOpen(consumption)}
                aria-label={`Ver detalhes de ${item.name}`}
                className="group w-full rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-5"
                style={{ boxShadow: "var(--shadow-card)" }}
            >
                <div className="flex gap-4">
                    {item.imageUrl ? (
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            loading="lazy"
                            className="size-16 shrink-0 rounded-xl object-cover sm:size-20"
                        />
                    ) : (
                        <div className="grid size-16 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/10 text-lg font-semibold text-primary sm:size-20">
                            {itemInitials(item.name)}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
                                    {item.name}
                                </h3>
                                {item.brand ? (
                                    <p className="truncate text-sm text-muted-foreground">
                                        {item.brand}
                                    </p>
                                ) : null}
                            </div>
                            <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                {isService ? (
                                    <Sparkles className="size-3" />
                                ) : (
                                    <Package className="size-3" />
                                )}
                                {isService ? "Serviço" : "Produto"}
                            </span>
                            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                                {item.category}
                            </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <Stars rating={consumption.rating} />
                            <span className="text-sm font-medium text-foreground">
                                {formatBRL(consumption.price)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                <CalendarDays className="size-3.5" />
                                {formatDate(consumption.date)}
                            </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            {consumption.wouldBuyAgain !== null ? (
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
                            ) : null}
                            <span>Motivo: {consumption.reason.friendlyName}</span>
                            <span className="hidden sm:inline">
                                Influência: {consumption.influence.friendlyName}
                            </span>
                        </div>
                    </div>
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
