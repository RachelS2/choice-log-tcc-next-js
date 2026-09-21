import {

    Bar,
    BarChart,
    CartesianGrid,

    Cell,

    ResponsiveContainer,

    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartCard } from "../analytics-small-components";
import { BrandPerformanceModel } from "@/models/dashboard/analytics";

interface Props {
    data: BrandPerformanceModel[];
    colors: string[];
}

export default function BrandPerformanceGraph({
    data, colors,
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="Desempenho por marca"
            description="Compare sua satisfação média com as marcas registradas."
        >
            <ResponsiveContainer width="100%" height={260}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        left: 20,
                        right: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                        domain={[0, 5]}
                        ticks={[0, 1, 2, 3, 4, 5]}
                    />

                    <YAxis
                        type="category"
                        dataKey="brand"
                        width={100}
                    />

                    <Tooltip
                        content={<BrandPerformanceTooltip />}
                    />

                    <Bar
                        dataKey="averageRating"
                        name="Avaliação média"
                        radius={[0, 4, 4, 0]}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

interface BrandTooltipProps {
    active?: boolean;
    payload?: {
        payload: BrandPerformanceModel;
    }[];
}

function BrandPerformanceTooltip({
    active,
    payload,
}: BrandTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const data = payload[0].payload;

    return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
            <p className="font-medium">
                {data.brand}
            </p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    Avaliação média:{" "}
                    <span className="font-medium">
                        {data.averageRating.toFixed(1)} ★
                    </span>
                </p>

                <p>
                    Experiências:{" "}
                    <span className="font-medium">
                        {data.experiences}
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