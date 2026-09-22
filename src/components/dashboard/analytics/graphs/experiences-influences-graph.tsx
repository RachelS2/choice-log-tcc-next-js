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
import { InfluenceData } from "@/models/dashboard/analytics";

interface Props {
    data: InfluenceData[];
    colors: string[];
}

export default function ExperiencesInfluencesGraph({
    data, colors
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="O que influencia suas escolhas?"
            description="Principais fatores que te fazem consumir, de acordo com seus registros."
        >
            <ResponsiveContainer width="100%" height={380}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-35}
                        textAnchor="end"
                        height={90}
                        tick={{
                            fontSize: 11,
                        }}
                    />
                    <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
                    <Tooltip content={<ToolTip/>}/>

                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
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


interface TooltipProps {
    active?: boolean;
    payload?: {
        payload: InfluenceData;
    }[];
}

function ToolTip({
    active,
    payload,
}: TooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const data = payload[0].payload;

    return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
            <p className="font-medium">
                {data.name}
            </p>

            <div className="mt-2 space-y-1 text-sm">
                <p>
                    Participação:{" "}
                    <span className="font-medium">
                        {data.value.toFixed(1)}%
                    </span>
                </p>

            </div>
        </div>
    );
}