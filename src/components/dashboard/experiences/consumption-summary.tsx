import { ConsumptionSummaryModel } from "@/models/dashboard/consumption";

import {
    ListChecks,
    Star,
    ThumbsUp,
    Wallet,
} from "lucide-react";

export function ConsumptionSummary({
    summary
}: {
    summary: ConsumptionSummaryModel
}) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
            <SummaryBadge>
                <ListChecks className="size-4" />
                <strong className="font-semibold">
                    {summary.total}
                </strong>
                <span>
                    {summary.total === 1 ? "consumo" : "consumos"}
                </span>
            </SummaryBadge>

            <SummaryBadge>
                <Star className="size-4" />
                <strong className="font-semibold">{summary.avg}</strong>
                <span>estrelas</span>
            </SummaryBadge>

            <SummaryBadge>
                <Wallet className="size-4" />
                <strong className="font-semibold">
                    {summary.totalSpent.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </strong>
                <span>gastos</span>
            </SummaryBadge>

            {summary.buyAgainPct !== null && (
                <SummaryBadge>
                    <ThumbsUp className="size-4" />
                    <strong className="font-semibold">
                        {summary.buyAgainPct}%
                    </strong>
                    <span>compraria novamente</span>
                </SummaryBadge>
            )}
        </div>
    );
}

function SummaryBadge({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
        inline-flex items-center gap-1.5
        rounded-full
        border-b border-foreground-200
        bg-offWhite h-11
        px-3 py-1.5 shadow-sm
        text-sm text-blue-800
      "
        >
            {children}
        </div>
    );
}