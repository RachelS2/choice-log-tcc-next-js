import { ActiveFilterChip } from "@/components/ui/choicelog-chips";
import { ConsumptionFilterState } from "@/lib/consumption-filters";
import { ConsumptionReasonModel, ConsumptionInfluenceModel } from "@/models/dashboard/consumption";

function createChip(
    condition: boolean,
    label: string,
    clear: () => void
): ActiveFilterChip | null {
    return condition
        ? {
            label,
            clear,
        }
        : null;
}

interface BuildConsumptionFilterChipsParams {
    filters: ConsumptionFilterState;
    patchFilters: (patch: Partial<ConsumptionFilterState>) => void;
    consumptionReasons: ConsumptionReasonModel[];
    consumptionInfluences: ConsumptionInfluenceModel[];
}

export function buildConsumptionFilterChips({
    filters,
    patchFilters,
    consumptionReasons,
    consumptionInfluences,
}: BuildConsumptionFilterChipsParams): ActiveFilterChip[] {
    const periodLabels = {
        "7d": "Últimos 7 dias",
        "30d": "Últimos 30 dias",
        "6m": "Últimos 6 meses",
        "1y": "Último ano",
    } as const;

    const reason = consumptionReasons.find(
        (reason) => String(reason.id) === filters.reasonId
    );

    const influence = consumptionInfluences.find(
        (influence) => String(influence.id) === filters.influenceId
    );

    return [
        createChip(
            !!filters.search.trim(),
            `Busca: "${filters.search.trim()}"`,
            () => patchFilters({ search: "" })
        ),

        createChip(
            filters.type !== "ALL",
            filters.type === "PRODUCT" ? "Produtos" : "Serviços",
            () => patchFilters({ type: "ALL" })
        ),

        createChip(
            filters.category !== "all",
            filters.category,
            () => patchFilters({ category: "all" })
        ),

        createChip(
            filters.rating !== "all",
            filters.rating === "5"
                ? "5 estrelas"
                : `${filters.rating} estrelas ou mais`,
            () => patchFilters({ rating: "all" })
        ),

        createChip(
            filters.period !== "all",
            filters.period === "custom"
                ? "Período personalizado"
                : periodLabels[filters.period as keyof typeof periodLabels],
            () =>
                patchFilters({
                    period: "all",
                    from: undefined,
                    to: undefined,
                })
        ),

        createChip(
            filters.buyAgain !== "all",
            `Compraria novamente: ${filters.buyAgain === "yes" ? "Sim" : "Não"
            }`,
            () => patchFilters({ buyAgain: "all" })
        ),

        createChip(
            filters.reasonId !== "all",
            `Motivo: ${reason?.friendlyName ?? ""}`,
            () => patchFilters({ reasonId: "all" })
        ),

        createChip(
            filters.influenceId !== "all",
            `Influência: ${influence?.friendlyName ?? ""}`,
            () => patchFilters({ influenceId: "all" })
        ),
    ].filter(
        (chip): chip is ActiveFilterChip => chip !== null
    );
}