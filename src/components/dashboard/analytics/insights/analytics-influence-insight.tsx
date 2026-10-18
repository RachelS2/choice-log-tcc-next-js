import {  ReliableInfluenceInsightModel } from "@/models/dashboard/analytics";

export function InfluenceInsight({ reliableInfluence }: { reliableInfluence: ReliableInfluenceInsightModel | null }) {
    return reliableInfluence ? (
        <>
            Experiências influenciadas por <strong>{reliableInfluence.influence.toLowerCase()}</strong> têm
            avaliação média de <strong>{reliableInfluence.averageRating.toFixed(1)}</strong> estrelas e <strong>{reliableInfluence.repurchaseRate.toFixed(1)}%</strong> de taxa recompra.
        </>
    ) : <>Ainda não há experiências suficientes para afirmar sua influência mais confiável.</>;
}