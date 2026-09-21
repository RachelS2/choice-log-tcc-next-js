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
import {  InfluenceData } from "@/models/dashboard/analytics";

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
            <ResponsiveContainer width="100%" height={290}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="name"
                        fontSize={11}
                        interval={0}
                        height={50}
                    />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />

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
