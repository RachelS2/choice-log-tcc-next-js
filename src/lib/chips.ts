import { ActiveFilterChip } from "@/components/ui/choicelog-chips";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BuyAgainFilter, ConsumptionFilterState, PeriodFilter, RatingFilter } from "./consumption-filters";
import { CatalogFilterState } from "./catalog-filters";
import { TypeFilter } from "@/app/dashboard/catalog/items/page";
import { ConsumptionInfluenceModel, ConsumptionReasonModel } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";

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

type PatchFilters = (
    patch: Partial<ConsumptionFilterState | CatalogFilterState>
) => void;

export function createSearchChip(
    search: string,
    patchFilters: PatchFilters
): ActiveFilterChip | null {
    return createChip(
        !!search.trim(),
        `Busca: "${search.trim()}"`,
        () => patchFilters({ search: "" })
    );
}

export function createTypeChip(
    type: TypeFilter,
    patchFilters: PatchFilters
): ActiveFilterChip | null {
    return createChip(
        type !== "ALL",
        type === "PRODUCT" ? "Produtos" : "Serviços",
        () => patchFilters({ type: "ALL" })
    );
}

export function createRatingsChip(
    rating: RatingFilter,
    patchFilters: PatchFilters
): ActiveFilterChip | null {
    return createChip(
        rating !== "all",
        rating === "5"
            ? "5 estrelas"
            : `${rating} estrelas ou mais`,
        () => patchFilters({ rating: "all" })
    );
}

export function createCustomPeriodChip(period: PeriodFilter, patchFilters: PatchFilters) {
    const periodLabels = {
        "7d": "Últimos 7 dias",
        "30d": "Últimos 30 dias",
        "6m": "Últimos 6 meses",
        "1y": "Último ano",
    } as const;
    return createChip(
        period !== "all",
        period === "custom"
            ? "Período personalizado"
            : periodLabels[period as keyof typeof periodLabels],
        () =>
            patchFilters({
                period: "all",
                from: undefined,
                to: undefined,
            })
    )
}

export function createWouldBuyAgainChip(
    buyAgain: BuyAgainFilter,
    patchFilters: PatchFilters
): ActiveFilterChip | null {
    return createChip(
        buyAgain !== "all",
        `Compraria novamente: ${buyAgain === "yes" ? "Sim" : "Não"
        }`,
        () => patchFilters({ buyAgain: "all" })
    )
}

export function createBrandChip(brand: string, patchFilters: PatchFilters): ActiveFilterChip | null {
    return createChip(
        brand !== "all",
        `Marca: ${brand}`,
        () => patchFilters({ brand: "all" })
    )
}

export function createConsumptionReasonChip(
    reasonId: string,
    patchFilters: PatchFilters,
    consumptionReasons: ConsumptionReasonModel[]
): ActiveFilterChip | null {
    const reason = consumptionReasons.find(
        (reason) => String(reason.id) === reasonId
    );
    return createChip(
        reasonId !== "all",
        `Motivo: ${reason?.friendlyName ?? ""}`,
        () => patchFilters({ reasonId: "all" })
    )
}

export function createConsumptionInfluenceChip(influenceId: string,
    patchFilters: PatchFilters,
    consumptionInfluences: ConsumptionInfluenceModel[]
): ActiveFilterChip | null {

    const influence = consumptionInfluences.find(
        (influence) => String(influence.id) === influenceId
    );

    return createChip(
        influenceId !== "all",
        `Influência: ${influence?.friendlyName ?? ""}`,
        () => patchFilters({ influenceId: "all" })
    )
}


export function createCategoryChip(categoryId: string,
    patchFilters: PatchFilters,
    categories: CategoryModel[]
): ActiveFilterChip | null {

    const category = categories.find(
        (influence) => String(influence.id) === categoryId
    );

    console.log(category)
    return createChip(
        categoryId !== "all",
        `Categoria: ${category?.name ?? ""}`,
        () => patchFilters({ category: "all" })
    )
}