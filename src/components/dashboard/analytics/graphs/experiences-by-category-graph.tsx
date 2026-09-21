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
import { CategoryValue } from "@/models/dashboard/analytics";

interface Props {
     data: CategoryValue[];
     colors: string[];
}

export default function ExperiencesByCategoryGraph({
    data, colors
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="Experiências por categoria"
            description="Categorias que aparecem com maior frequência no seu histórico."
        >
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="category" fontSize={12} />
                    <YAxis allowDecimals={false} fontSize={12} />
                    <Tooltip />

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
