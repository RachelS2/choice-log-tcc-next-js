import {  ReliableInfluenceInsightModel } from "@/models/dashboard/analytics";

export function InfluenceInsight({ reliableInfluence }: { reliableInfluence: ReliableInfluenceInsightModel | null }) {
    return reliableInfluence ? (
        <>
            Experiências influenciadas por <strong>{reliableInfluence.influence.toLowerCase()}</strong> têm
            avaliação média de <strong>{reliableInfluence.averageRating}</strong> e <strong>{reliableInfluence.repurchaseRate}%</strong> de taxa recompra.
        </>
    ) : <>Ainda não há experiências suficientes para afirmar sua influência mais confiável.</>;
}