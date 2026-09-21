
import { ChartCard } from "../analytics-small-components";
import { ReasonPerformanceModel } from "@/models/dashboard/analytics";
import {

    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface Props {
    data: ReasonPerformanceModel[];
}


interface Props {
    data: ReasonPerformanceModel[];
    colors: string[];
}

export default function ConsumptionReasonGraph({
    data,
    colors,
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="MOTIVOS DE CONSUMO"
            description="Visualize suas principais razões para comprar."
        >
            <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="percentage"
                        nameKey="reason"
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        content={<ConsumptionReasonTooltip />}
                    />

                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

interface ReasonTooltipProps {
    active?: boolean;
    payload?: {
        payload: ReasonPerformanceModel;
    }[];
}

function ConsumptionReasonTooltip({
    active,
    payload,
}: ReasonTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const data = payload[0].payload;

    return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
            <p className="font-medium">
                {data.reason}
            </p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    Participação:{" "}
                    <span className="font-medium">
                        {data.percentage.toFixed(1)}%
                    </span>
                </p>

                <p>
                    Experiências:{" "}
                    <span className="font-medium">
                        {data.experiences}
                    </span>
                </p>

                <p>
                    Avaliação média:{" "}
                    <span className="font-medium">
                        {data.averageRating.toFixed(1)} ★
                    </span>
                </p>

                <p>
                    Consumiria novamente:{" "}
                    <span className="font-medium">
                        {data.repurchaseRate.toFixed(0)}%
                    </span>
                </p>
            </div>
        </div>
    );
}