import {

    Bar,
    CartesianGrid,

    ComposedChart,

    Legend,

    Line,

    ResponsiveContainer,

    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartCard } from "../analytics-small-components";
import { SpendingSatisfactionByCategory } from "@/models/dashboard/analytics";

interface Props {
    data: SpendingSatisfactionByCategory[];
}

export default function SpencesXSatisfactionGraph({
    data,
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="Gastos e satisfação por categoria"
            description="Veja onde o valor das suas experiências está concentrado."
        >
            <ResponsiveContainer width="100%" height={340}>
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="category" />

                    <YAxis
                        yAxisId="spending"
                        tickFormatter={(value) =>
                            `R$ ${value.toLocaleString("pt-BR")}`
                        }
                    />

                    <YAxis
                        yAxisId="rating"
                        orientation="right"
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                        yAxisId="spending"
                        dataKey="totalSpent"
                        name="Total gasto"
                        fill="#7ba4e7"
                        radius={[4, 4, 0, 0]}
                    />

                    <Line
                        yAxisId="rating"
                        type="monotone"
                        dataKey="averageRating"
                        name="Avaliação média"
                        stroke="#f59e0b"
                        strokeWidth={2}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
