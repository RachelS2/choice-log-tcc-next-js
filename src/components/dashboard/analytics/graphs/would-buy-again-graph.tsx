
import { ChartCard } from "../analytics-small-components";
import { BuyAgainByCategoryModel } from "@/models/dashboard/analytics";
import {

    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface Props {
    data: BuyAgainByCategoryModel[];
}

export default function WouldBuyAgainGraph({
    data
}: Props) {
    if (!data?.length) return null;

    return (


        <ChartCard
            title="Consumiria novamente?"
            description="Veja como sua intenção de repetir a experiência varia entre categorias."
        >
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ left: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                        dataKey="category"
                        type="category"
                        width={90}
                        fontSize={12}
                    />

                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />

                    <Bar
                        dataKey="yes"
                        name="Sim"
                        stackId="repurchase"
                        fill="#3b82f6"
                    />

                    <Bar
                        dataKey="no"
                        name="Não"
                        stackId="repurchase"
                        fill="#fbbf24"
                        radius={[0, 5, 5, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}
