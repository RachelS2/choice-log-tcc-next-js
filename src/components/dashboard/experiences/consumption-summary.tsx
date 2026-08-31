import { Star, ThumbsUp, ListChecks } from "lucide-react";
import { formatRating } from "@/lib/consumptions-mock";

export function ConsumptionSummary({
    total,
    avg,
    buyAgainPct,
}: {
    total: number;
    avg: number;
    buyAgainPct: number | null;
}) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-foreground">
                <ListChecks className="size-4 text-muted-foreground" />
                <strong className="font-semibold">{total}</strong>
                {total === 1 ? "consumo" : "consumos"}
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span className="inline-flex items-center gap-1.5 text-foreground">
                <Star className="size-4 fill-primary text-primary" />
                <strong className="font-semibold">{formatRating(avg)}</strong>
                <span className="text-muted-foreground">média</span>
            </span>
            {buyAgainPct !== null ? (
                <>
                    <span className="text-muted-foreground/50">·</span>
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                        <ThumbsUp className="size-4 text-muted-foreground" />
                        <strong className="font-semibold">{buyAgainPct}%</strong>
                        <span className="text-muted-foreground">compraria novamente</span>
                    </span>
                </>
            ) : null}
        </div>
    );
}
