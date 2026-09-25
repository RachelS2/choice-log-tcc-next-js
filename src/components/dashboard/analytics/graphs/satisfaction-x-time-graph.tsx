import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartCard } from "../analytics-small-components";
import { SatisfactionOverTimeModel } from "@/models/dashboard/analytics";

interface Props {
    data: SatisfactionOverTimeModel[];
    colors: string[],
}

export default function SpendingSatisfactionOverTimeGraph({
    data, colors
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="Gastos e satisfação ao longo do tempo"
            description="Acompanhe a evolução dos seus gastos e da avaliação média das experiências."
        >
            <ResponsiveContainer width="100%" height={340}>
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 35,
                        left: 35,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="period"
                    />

                    <YAxis
                        yAxisId="spending"
                        tickFormatter={(value) =>
                            Number(value).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                maximumFractionDigits: 0,
                            })
                        }

                    />

                    <YAxis
                        yAxisId="rating"
                        orientation="right"
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}

                        label={{
                            value: "Avaliação média",
                            angle: 90,
                            position: "insideRight",
                            style: {
                                textAnchor: "middle",
                                fontSize: 12,
                            },
                        }}
                    />

                    <Tooltip
                        content={<SpendingSatisfactionTimeTooltip />}
                    />

                    <Legend />

                    <Line
                        yAxisId="spending"
                        type="monotone"
                        dataKey="totalSpent"
                        name="Total gasto"
                        stroke={colors[0]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />

                    <Line
                        yAxisId="rating"
                        type="monotone"
                        dataKey="averageRating"
                        name="Avaliação média"
                        stroke={colors[1]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

interface TimeTooltipProps {
    active?: boolean;
    payload?: {
        payload: SatisfactionOverTimeModel;
    }[];
}

function SpendingSatisfactionTimeTooltip({
    active,
    payload,
}: TimeTooltipProps) {
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
                {data.period}
            </p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    Total gasto:{" "}
                    <span className="font-medium">
                        {data.totalSpent.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </p>

                <p>
                    Avaliação média:{" "}
                    <span className="font-medium">
                        {data.averageRating
                            .toFixed(1)
                            .replace(".", ",")} ★
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