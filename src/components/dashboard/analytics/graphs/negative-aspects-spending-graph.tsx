
import { NegativeAspectSpendingModel } from "@/models/dashboard/analytics";
import { ChartCard } from "../analytics-small-components";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList, Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { CircleCheckBig } from "lucide-react";

interface Props {
    data: NegativeAspectSpendingModel[];
    colors: string[];
}

export default function NegativeAspectSpendingGraph({
    data, colors
}: Props) {
    if (!data?.length) {
        return (
            <ChartCard
                title="GASTOS ASSOCIADOS A ASPECTOS NEGATIVOS"
                description="Veja quanto dos seus gastos está associado a experiências em que aspectos negativos foram identificados."
            >
                <div className="flex h-[200px] flex-col items-center justify-center text-center">
                    <CircleCheckBig
                        className="mb-3 size-9 text-blue-900"
                        strokeWidth={1.0}
                    />

                    <p className="font-medium">
                        Nenhum aspecto negativo registrado
                    </p>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                        Suas experiências no período selecionado não possuem
                        aspectos negativos associados.
                    </p>
                </div>

            </ChartCard>
        );
    }

    return (
        <ChartCard
            title="GASTOS POR ASPECTO NEGATIVO"
            description="Veja como cada aspecto negativo te impacta financeiramente."
        >
            <ResponsiveContainer width="100%" height={340}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 40,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                    />

                    <XAxis
                        type="number"
                        tickFormatter={(value) =>
                            Number(value).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                maximumFractionDigits: 0,
                            })
                        }
                    />

                    <YAxis
                        type="category"
                        dataKey="aspect"
                        width={140}
                    />

                    <Tooltip
                        content={<NegativeAspectSpendingTooltip />}
                    />

                    <Bar
                        dataKey="totalSpent"
                        name="Total gasto"
                        radius={[0, 4, 4, 0]}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                        <LabelList
                            dataKey="totalSpent"
                            position="insideRight"
                            formatter={(value) => {
                                if (value == null) return "";

                                return Number(value).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL",
                                        maximumFractionDigits: 0,
                                    }
                                );
                            }}
                            fill="white"
                            fontSize={11}
                            fontWeight={500}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}


interface NegativeAspectTooltipProps {
    active?: boolean;
    payload?: {
        payload: NegativeAspectSpendingModel;
    }[];
}

function NegativeAspectSpendingTooltip({
    active,
    payload,
}: NegativeAspectTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const data = payload[0]?.payload;

    if (!data) {
        return null;
    }

    return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
            <p className="font-medium">
                {data.aspect}
            </p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    Gasto associado:{" "}
                    <span className="font-medium">
                        {data.totalSpent.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </p>

                <p>
                    Gasto médio:{" "}
                    <span className="font-medium">
                        {data.averageSpent.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </p>

                <p>
                    Experiências:{" "}
                    <span className="font-medium">
                        {data.experiences}
                    </span>
                </p>
            </div>
        </div>
    );
}