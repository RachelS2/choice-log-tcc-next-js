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
    iconClassName?: string;
}

export function MetricCard({
    icon,
    title,
    value,
    description,
    className,
    iconClassName,
}: MetricCardProps) {
    return (
        <Card
            className={cn(
                "group py-0 rounded-xl border bg-white shadow-sm",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-md",
                className
            )}
        >
            <CardContent className="flex items-start gap-4 p-5">
                <div
                    className={cn(
                        "mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl",
                        iconClassName
                    )}
                >
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-slate-900">
                        {value}
                    </p>

                    <p className="mt-0.5 text-sm font-medium text-slate-700">
                        {title}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {description}
                    </p>
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
    if (avg == null) {
        throw Error("Média de notas deveria possuir valor!");
    }

    return (
        <MetricCard
            icon={<Star className="size-5 text-blue-600" />}
            value={avg.toFixed(1).replace(".", ",")}
            title="Avaliação média"
            description="de 5 estrelas"
            className="border-blue-200 bg-blue-50/40"
            iconClassName="bg-blue-100"
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
        <MetricCard
            icon={<RefreshCcw className="size-5 text-emerald-600" />}
            value={`${avg.toFixed(1).replace(".", ",")}%`}
            title="Taxa de recompra"
            description="consumiria novamente"
            className="border-emerald-200 bg-emerald-50/40"
            iconClassName="bg-emerald-100"
        />
    );
}

export function MostLikedCategoryMetricCard({
    data,
}: {
    data: CategoryValue;
}) {
    return (
        <MetricCard
            icon={<Trophy className="size-5 text-amber-600" />}
            value={data.category}
            title="Categoria mais satisfatória"
            description={`avaliação média de ${data.value
                .toFixed(1)
                .replace(".", ",")}`}
            className="border-amber-200 bg-amber-50/40"
            iconClassName="bg-amber-100"
        />
    );
}

export function MostConsumedCategoryMetricCard({
    data,
}: {
    data: CategoryValue;
}) {
    return (
        <MetricCard
            icon={
                <ChartNoAxesColumnIncreasing className="size-5 text-violet-600" />
            }
            value={data.category}
            title="Categoria mais consumida"
            description={`${data.value} experiências`}
            className="border-violet-200 bg-violet-50/40"
            iconClassName="bg-violet-100"
        />
    );
}