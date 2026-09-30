import { ConsumptionSummaryModel } from "@/models/dashboard/consumption";

import {
    ListChecks,
    Star,
    ThumbsUp,
    Wallet,
} from "lucide-react";

export function ConsumptionSummary({
    summary,
}: {
    summary: ConsumptionSummaryModel;
}) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <SummaryBadge>
                <ListChecks className="size-4 text-blue-600" />
                <strong className="font-semibold text-slate-900">
                    {summary.total}
                </strong>
                <span>
                    {summary.total === 1 ? "consumo" : "consumos"}
                </span>
            </SummaryBadge>

            <SummaryBadge>
                <Star className="size-4 text-amber-500" />
                <strong className="font-semibold text-slate-900">
                    {summary.avg.toFixed(1)}
                </strong>
                <span>estrelas</span>
            </SummaryBadge>

            <SummaryBadge>
                <Wallet className="size-4 text-blue-600" />
                <strong className="font-semibold text-slate-900">
                    {summary.totalSpent.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </strong>
                <span>gastos</span>
            </SummaryBadge>

            {summary.buyAgainPct !== null && (
                <SummaryBadge>
                    <ThumbsUp className="size-4 text-emerald-600" />
                    <strong className="font-semibold text-slate-900">
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
        inline-flex h-10 items-center gap-2
        rounded-xl
        border border-blue-100
        bg-white/75
        px-3.5
        text-sm text-slate-600
        shadow-sm
        transition-colors
        hover:border-blue-200
        hover:bg-white
      "
        >
            {children}
        </div>
    );
}