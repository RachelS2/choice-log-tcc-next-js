
import { ChartCard } from "../analytics-small-components";
import { InfluenceSatisfactionModel } from "@/models/dashboard/analytics";

interface Props {
    data: InfluenceSatisfactionModel[];
}

export default function InfluencesXSatisfactionGraph({
    data
}: Props) {
    if (!data?.length) return null;

    return (
        <ChartCard
            title="Influência e satisfação"
            description="Como cada influência impacta sua satisfação no consumo."
        >
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50 text-left">
                            <th className="px-3 py-3 font-medium">Influência</th>
                            <th className="px-3 py-3 font-medium">Avaliação média</th>
                            <th className="px-3 py-3 font-medium">Recompra</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row) => (
                            <tr key={row.influence} className="border-b last:border-0">
                                <td className="px-3 py-3">{row.influence}</td>
                                <td className="px-3 py-3 font-medium">
                                    {row.rating.toFixed(1).replace(".", ",")}
                                </td>
                                <td className="px-3 py-3 font-medium">
                                    {row.repurchase}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ChartCard>
    );
}
