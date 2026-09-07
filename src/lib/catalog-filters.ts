import { TypeFilter } from "@/app/dashboard/catalog/items/page";
import { SortItemsOptions } from "@/models/dashboard/consumption";
import { ActiveFilterChip } from "@/components/ui/choicelog-chips";
import { ConsumptionReasonModel, ConsumptionInfluenceModel } from "@/models/dashboard/consumption";
import { CreateUpdateItemModel } from "@/models/dashboard/items";


export interface CatalogFilterState {
    search: string;
    type: TypeFilter;
    category: string;
    brand: string;
}

export const defaultFilters: CatalogFilterState = {
    search: "",
    type: "ALL",
    category: "all",
    brand: "all",
};

export const sortLabels: Record<SortItemsOptions, string> = {
    recent: "Mais recentes",
    last_consumed: "Consumidos por último",
    most_experiences: "Mais experiências",
    alphabetical: "Ordem alfabética",
    most_spent: "Mais gastos",
};

export function activeFilterCount(filters: CatalogFilterState) {
    let count = 0;

    if (filters.search.trim()) count++;
    if (filters.type !== "ALL") count++;
    if (filters.category !== "all") count++;
    if (filters.brand !== "all") count++;

    return count;
}

export function filterItems(
    data: CreateUpdateItemModel[],
    filters: CatalogFilterState
) {
    const search = filters.search.trim().toLowerCase();

    return data.filter((item) => {
        if (search) {
            const haystack = `
        ${item.friendlyName}
        ${item.systemName}
        ${item.brand}
        ${item.categoryName}
      `.toLowerCase();

            if (!haystack.includes(search)) {
                return false;
            }
        }

        if (
            filters.type !== "ALL" &&
            item.type !== filters.type
        ) {
            return false;
        }

        if (
            filters.category !== "all" &&
            item.categoryName !== filters.category
        ) {
            return false;
        }

        if (
            filters.brand !== "all" &&
            item.brand !== filters.brand
        ) {
            return false;
        }

        return true;
    });
}

export function sortItems(
    data: CreateUpdateItemModel[],
    sort: SortItemsOptions
) {
    const items = [...data];

    items.sort((a, b) => {
        switch (sort) {
            case "recent":
                return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                );

            case "last_consumed":
                return (
                    getDateTime(b.lastConsumed) -
                    getDateTime(a.lastConsumed)
                );

            case "most_experiences":
                return b.experiences - a.experiences;

            case "most_spent":
                return b.totalSpent - a.totalSpent;

            case "alphabetical":
                return a.friendlyName.localeCompare(
                    b.friendlyName,
                    "pt-BR"
                );

            default:
                return 0;
        }
    });

    return items;
}


interface BuildConsumptionFilterChipsParams {
    filters: CatalogFilterState;
    patchFilters: (patch: Partial<CatalogFilterState>) => void;
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
    ].filter(
        (chip): chip is ActiveFilterChip => chip !== null
    );
}