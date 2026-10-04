import { CategoryValue } from "@/models/dashboard/analytics";
import { ChartNoAxesColumnIncreasing, PackageOpen, RefreshCcw, Star, Trophy } from "lucide-react";
import { InsightCard } from "./analytics/analytics-small-components";
import { RatingStars } from "../ui/rating-starts";

interface AvaliacaoMediaMetricCardProps {
    avg: number | null;
}

export function AvaliacaoMediaMetricCard({
    avg,
}: AvaliacaoMediaMetricCardProps) {
    if (avg == null) {
        throw Error("Média de notas deveria possuir valor!");
    }

    return (
        <InsightCard
            icon={<Star className="size-5 text-blue-600" />}
            title="Avaliação média"
            children={

                <div className="mt-3 flex flex-col items-center">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-3xl font-bold tracking-tight text-slate-900">
                            {avg.toFixed(1).replace(".", ",")}
                        </span>

                        <span className="text-sm font-medium text-slate-500">
                            / 5
                        </span>

                        <RatingStars value={avg} size="xsm" />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                        média das experiências
                    </p>
                </div>
            }
        />
    );
}

export function BuyAgainMetricCard({
    avg,
}: AvaliacaoMediaMetricCardProps) {
    if (avg == null) {
        throw Error("Média de recompra deveria possuir valor!");
    }

    return (
        <InsightCard
            icon={<RefreshCcw className="size-5 text-emerald-600" />}
            title="Taxa de recompra"
            children={
                <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="w-[120px]">
                        <p className="text-sm font-medium leading-5 text-slate-700">
                            Consumiria novamente
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            das experiências
                        </p>
                    </div>

                    <div className="relative size-14 shrink-0">
                        <svg
                            viewBox="0 0 36 36"
                            className="size-full -rotate-90"
                        >
                            <circle
                                cx="18"
                                cy="18"
                                r="15"
                                fill="none"
                                strokeWidth="3"
                                className="stroke-emerald-100"
                            />

                            <circle
                                cx="18"
                                cy="18"
                                r="15"
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
                                pathLength="100"
                                strokeDasharray="100"
                                strokeDashoffset={100 - avg}
                                className="stroke-emerald-500"
                            />
                        </svg>

                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900">
                            {avg.toFixed(0)}%
                        </span>
                    </div>
                </div>
            }
        />
    );
}

export function MostLikedCategoryMetricCard({
    data,
}: {
    data: CategoryValue;
}) {
    return (
        <InsightCard
            icon={<Trophy className="size-5 text-amber-600" />}
            title="Categoria mais satisfatória"
            children={<p><strong>{data.category}</strong> é a sua categoria mais satisfatória, com avaliação média de
                {" "} {data.value.toFixed(1).replace(".", ",")} estrelas.</p>}
        />
    );
}

export function MostConsumedCategoryMetricCard({
    data,
}: {
    data: CategoryValue;
}) {
    return (
        <InsightCard
            icon={
                <ChartNoAxesColumnIncreasing className="size-5 text-violet-600" />
            }
            title="Categoria mais consumida"
            children={<p><strong>{data.category}</strong> é sua categoria mais consumida, com {data.value} experiência(s).</p>}

        />
    );
}