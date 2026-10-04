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

export function SatisfactionOverTimeResponsiveContainer({data, height = 250} : {data: SatisfactionOverTimeModel[], height?: number}) {
    return (< ResponsiveContainer width="100%" height={height} >
        <LineChart
            data={data}
            margin={{
                top: 10,
                right: 15,
                left: -10,
                bottom: 0,
            }}
        >
            <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
            />

            <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
            />

            <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
            />

            <Tooltip content={<SatisfactionOverTimeToolTip />} />

            <Line
                type="monotone"
                dataKey="averageRating"
                name="Avaliação média"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{
                    r: 4,
                    fill: "#ffffff",
                    strokeWidth: 2,
                }}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    </ResponsiveContainer >
    )
}
export default function SatisfactionOverTimeGraph({
    data, colors
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="Satisfação ao longo do tempo"
            description="Acompanhe a evolução da sua satisfação ao longo do tempo."
        >
            <SatisfactionOverTimeResponsiveContainer data={data} height={310} />
        </ChartCard>
    );
}

interface TimeTooltipProps {
    active?: boolean;
    payload?: {
        payload: SatisfactionOverTimeModel;
    }[];
}

function SatisfactionOverTimeToolTip({
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