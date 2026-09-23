import { CategoryValue } from "@/models/dashboard/analytics";
import { ChartNoAxesColumnIncreasing, PackageOpen, RefreshCcw, Star, Trophy } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | null;
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
    avg: number | null;
}

export function AvaliacaoMediaMetricCard({
    avg,
}: AvaliacaoMediaMetricCardProps) {
    if (avg == null) throw Error("Média de notas deveria possuir valor!");
    return (
        <MetricCard
            icon={<Star className="size-5 text-blue-600" />}
            value={avg.toFixed(1).toString()}
            title="Avaliação média"
            description="de 5 estrelas"
            className="border-blue-200 bg-blue-50/60"
        />

    );
}

export function BuyAgainMetricCard({ avg }: AvaliacaoMediaMetricCardProps) {
    if (avg == null) throw Error("Média de recompra deveria possuir valor!");

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



export function MostLikedCategoryMetricCard({ data }: { data: CategoryValue }) {

    return (
        <MetricCard
            icon={<Trophy className="size-5 text-amber-600" />}
            value={data.category}
            title="Categoria mais satisfatória"
            description={`avaliação média de ${data.value.toFixed(1).replace(".", ",")}`}
            className="border-amber-200 bg-amber-50/60"
        />
    )
}

export function MostSpentCategoryMetricCard({ data }: { data: CategoryValue }) {

    return (
        <MetricCard
            icon={
                <ChartNoAxesColumnIncreasing className="size-5 text-violet-600" />
            }
            value={data.category}
            title="Categoria com maior gasto"
            description={`R$ ${data.value} gastos`}
            className="border-violet-200 bg-violet-50/60"
        />

    )
}