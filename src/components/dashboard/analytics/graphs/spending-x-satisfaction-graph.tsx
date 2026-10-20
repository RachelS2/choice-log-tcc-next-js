"use client";

import { SpendingSatisfactionPointModel } from "@/models/dashboard/analytics";
import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartCard } from "../analytics-small-components";

const formatCurrencyShort = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);

interface SpendingSatisfactionScatterGraphProps {
    data: SpendingSatisfactionPointModel[];
}

export function SpendingSatisfactionScatterGraph({
    data,
}: SpendingSatisfactionScatterGraphProps) {
    return (
        <ChartCard
            title="Satisfação e Valor Gasto"
            description="Veja a relação entre o valor que você gastou e a nota que você atribuiu para cada experiência."
        >
            <div className="h-[360px] w-full sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 12,
                            right: 12,
                            bottom: 32,
                            left: 8,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            dataKey="price"
                            name="Valor gasto"
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={10}
                            tickMargin={10}
                            tickFormatter={formatCurrencyShort}
                        />

                        <YAxis
                            type="number"
                            dataKey="rating"
                            name="Avaliação"
                            domain={[1, 5]}
                            ticks={[1, 2, 3, 4, 5]}
                            allowDecimals={false}
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            width={28}
                        />

                        <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            content={<SpendingSatisfactionTooltip />}
                        />

                        <Scatter
                            name="Experiências"
                            data={data}
                            fill="#2563eb"
                            fillOpacity={0.7}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    );
}

function SpendingSatisfactionTooltip({
    active,
    payload,
}: {
    active?: boolean;
    payload?: Array<{
        payload: SpendingSatisfactionPointModel;
    }>;
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const experience = payload[0].payload;

    return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
            <p className="font-semibold text-slate-900">{experience.itemName}</p>

            <p className="text-sm text-slate-500">{experience.category}</p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    <span className="font-medium">Valor:</span>{" "}
                    {experience.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>

                <p>
                    <span className="font-medium">Avaliação:</span>{" "}
                    {experience.rating.toLocaleString("pt-BR")} ★
                </p>

                <p>
                    <span className="font-medium">Data:</span>{" "}
                    {new Date(experience.date).toLocaleDateString("pt-BR")}
                </p>
            </div>
        </div>
    );
}