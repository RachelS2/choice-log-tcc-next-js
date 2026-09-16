
/* -------------------------------------------------------------------------- */
/*                               SMALL COMPONENTS                             */
/* -------------------------------------------------------------------------- */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import { cn } from "@/lib/utils";
import { ChartNoAxesColumnIncreasing, RefreshCcw, Star, Trophy } from "lucide-react";

interface MetricCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    description: string;
    className?: string;
}

export function MetricCard({
    icon,
    title,
    value,
    description,
    className,
}: MetricCardProps) {
    return (
        <Card className={cn("shadow-md border", className)}>
            <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-15 shrink-0 items-center justify-center rounded-xl bg-white/70">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-900">{value}</p>
                    <p className="text-lg font-medium text-slate-700">{title}</p>
                    <p className="mt-0.5 text-md text-muted-foreground">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}

interface AvaliacaoMediaMetricCardProps {
    avg: number;
}

export function AvaliacaoMediaMetricCard({
    avg,
}: AvaliacaoMediaMetricCardProps) {
    return (
        <MetricCard
            icon={<Star className="size-5 text-blue-600" />}
            value={avg.toString()}
            title="Avaliação média"
            description="de 5 estrelas"
            className="border-blue-200 bg-blue-50/60"
        />
    );
}
export function BuyAgainMetricCard({ avg }: AvaliacaoMediaMetricCardProps) {
    return (
        <MetricCard
            icon={<RefreshCcw className="size-5 text-emerald-600" />}
            value={avg.toFixed(1).replace(".", ",").toString()}
            title="Taxa de recompra"
            description="consumiria novamente"
            className="border-emerald-200 bg-emerald-50/60"
        />
    )
}

interface CategoryAndValueProps {
    category: string;
    value: number;

}

export function MostLikedCategoryMetricCard({ category, value }: CategoryAndValueProps) {
    return (
        <MetricCard
            icon={<Trophy className="size-5 text-amber-600" />}
            value={category}
            title="Categoria mais satisfatória"
            description={`avaliação média de ${value.toFixed(1).replace(".", ",")}`}
            className="border-amber-200 bg-amber-50/60"
        />

    )
}

export function MostSpentCategoryMetricCard({ category, value }: CategoryAndValueProps) {
    return (
        <MetricCard
            icon={
                <ChartNoAxesColumnIncreasing className="size-5 text-violet-600" />
            }
            value={category}
            title="Categoria com maior gasto"
            description={`R$ ${value} gastos`}
            className="border-violet-200 bg-violet-50/60"
        />

    )
}

interface InsightCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export function InsightCard({ icon, title, children }: InsightCardProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="mb-3 flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        {icon}
                    </div>

                    <h3 className="pt-1 text-base font-semibold leading-snug">{title}</h3>
                </div>

                <p className="text-md leading-relaxed text-muted-foreground">
                    {children}
                </p>
            </CardContent>
        </Card>
    );
}

interface ChartCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

export function ChartCard({
    title,
    description,
    children,
    className,
}: ChartCardProps) {
    return (
        <Card className={cn("", className)}>
            <CardHeader className="pb-2">
                <PageHeader lineBefore header={title} textClassName="text-base" />
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    );
}