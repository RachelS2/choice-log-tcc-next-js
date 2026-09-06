import { TypeFilter } from "@/app/dashboard/catalog/items/page";
import { ReadConsumptionModel, SortConsumptionsOptions, SortItemsOptions } from "@/models/dashboard/consumption";

export type RatingFilter = "all" | "5" | "4" | "3" | "2" | "1";
export type PeriodFilter = "all" | "7d" | "30d" | "6m" | "1y" | "custom";
export type BuyAgainFilter = "all" | "yes" | "no";


export interface ConsumptionFilterState {
    search: string;
    type: TypeFilter;
    category: string; // "all" | category name
    rating: RatingFilter;
    period: PeriodFilter;
    from: Date | undefined; 
    to: Date | undefined; 
    buyAgain: BuyAgainFilter;
    reasonId: string; // "all" | id
    influenceId: string; // "all" | id
}

export const defaultFilters: ConsumptionFilterState = {
    search: "",
    type: "ALL",
    category: "all",
    rating: "all",
    period: "all",
    from: undefined,
    to: undefined,
    buyAgain: "all",
    reasonId: "all",
    influenceId: "all",
};

export const sortLabels: Record<SortConsumptionsOptions, string> = {
    recent: "Mais recentes",
    oldest: "Mais antigos",
    rating_desc: "Maior avaliação",
    rating_asc: "Menor avaliação",
    most_spent: "Maior preço",
    least_spent: "Menor preço",
};

export function activeFilterCount(f: ConsumptionFilterState) {
    let n = 0;
    if (f.search.trim()) n += 1;
    if (f.type !== "ALL") n += 1;
    if (f.category !== "all") n += 1;
    if (f.rating !== "all") n += 1;
    if (f.period !== "all") n += 1;
    if (f.buyAgain !== "all") n += 1;
    if (f.reasonId !== "all") n += 1;
    if (f.influenceId !== "all") n += 1;
    return n;
}

function periodStart(period: PeriodFilter, now: Date) {
    const d = new Date(now);
    switch (period) {
        case "7d":
            d.setDate(d.getDate() - 7);
            return d;
        case "30d":
            d.setDate(d.getDate() - 30);
            return d;
        case "6m":
            d.setMonth(d.getMonth() - 6);
            return d;
        case "1y":
            d.setFullYear(d.getFullYear() - 1);
            return d;
        default:
            return null;
    }
}

export function filterConsumptions(
    data: ReadConsumptionModel[],
    f: ConsumptionFilterState,
    now = new Date(),
) {
    const q = f.search.trim().toLowerCase();
    const start = periodStart(f.period, now);
    const customFrom = f.period === "custom" && f.from ? new Date(f.from) : null;
    const customTo = f.period === "custom" && f.to ? new Date(`${f.to}T23:59:59`) : null;

    return data.filter((c) => {
        if (q) {
            const hay = `${c.item.friendlyName} ${c.item.brand ?? ""}`.toLowerCase();
            if (!hay.includes(q)) return false;
        }
        if (f.type !== "ALL") {
            if (c.item.type.toUpperCase() !== f.type) return false;
        }
        if (f.category !== "all" && c.item.categoryName !== f.category) return false;
        if (f.rating !== "all" && c.rating < Number(f.rating)) return false;

        const date = new Date(c.date);
        if (start && date < start) return false;
        if (customFrom && date < customFrom) return false;
        if (customTo && date > customTo) return false;

        if (f.buyAgain === "yes" && c.wouldBuyAgain !== true) return false;
        if (f.buyAgain === "no" && c.wouldBuyAgain !== false) return false;
        if (f.buyAgain === "all" && c.wouldBuyAgain === null) return false;

        if (f.reasonId !== "all" && String(c.reason.id) !== f.reasonId) return false;
        if (f.influenceId !== "all" && String(c.influence.id) !== f.influenceId)
            return false;

        return true;
    });
}

export function sortConsumptions(data: ReadConsumptionModel[], sort: SortConsumptionsOptions) {
    const out = [...data];
    out.sort((c1, c2) => {

        switch (sort) {
            case "oldest":
                return +new Date(c1.date) - +new Date(c2.date);
            case "rating_desc":
                return c1.rating - c2.rating;
            case "rating_asc":
                return c1.rating - c2.rating;
            case "most_spent":
                return c1.price - c2.price;
            case "least_spent":
                return c1.price - c2.price;
            default:
                return +new Date(c1.date) - +new Date(c2.date);
        }
    });
    return out;
}

export function summarize(data: ReadConsumptionModel[]) {
    const total = data.length;
    const avg = total
        ? data.reduce((s, c) => s + c.rating, 0) / total
        : 0;
    const answered = data.filter((c) => c.wouldBuyAgain !== null);
    const yes = answered.filter((c) => c.wouldBuyAgain === true).length;
    const buyAgainPct = answered.length
        ? Math.round((yes / answered.length) * 100)
        : null;
    return { total, avg, buyAgainPct };
}
