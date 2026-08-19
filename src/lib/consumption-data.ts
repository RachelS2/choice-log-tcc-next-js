// Reference data that would come from the backend tables
// (ConsumptionReason, ConsumptionInfluence, NegativeAspect).
// Kept in one module so the UI never hardcodes options inline.

export const ITEM_TYPE = { PRODUCT: 1, SERVICE: 2 } as const;
export type ItemTypeId = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];

export interface Item {
    id: string;
    name: string;
    brand: string;
    category: string;
    typeId: ItemTypeId;
    imageUrl?: string;
}

export interface ConsumptionReason {
    id: number;
    systemName: string;
    friendlyName: string;
    typeId: ItemTypeId;
}

export interface ConsumptionInfluence {
    id: number;
    systemName: string;
    friendlyName: string;
}

export interface NegativeAspect {
    id: number;
    systemName: string;
    friendlyName: string;
    typeId: ItemTypeId;
}

export const items: Item[] = [
    {
        id: "itm_1",
        name: "Cold Brew Signature",
        brand: "Nortada Coffee",
        category: "Coffee & Drinks",
        typeId: ITEM_TYPE.PRODUCT,
    },
    {
        id: "itm_2",
        name: "Deep Tissue Massage",
        brand: "Serena Spa",
        category: "Wellness",
        typeId: ITEM_TYPE.SERVICE,
    },
    {
        id: "itm_3",
        name: "Running Shoes Pace 4",
        brand: "Atlan",
        category: "Footwear",
        typeId: ITEM_TYPE.PRODUCT,
    },
];

export const consumptionReasons: ConsumptionReason[] = [
    { id: 1, systemName: "routine", friendlyName: "Part of my routine", typeId: ITEM_TYPE.PRODUCT },
    { id: 2, systemName: "necessity", friendlyName: "I needed it", typeId: ITEM_TYPE.PRODUCT },
    { id: 3, systemName: "impulse", friendlyName: "Impulse", typeId: ITEM_TYPE.PRODUCT },
    { id: 4, systemName: "gift", friendlyName: "It was a gift", typeId: ITEM_TYPE.PRODUCT },
    { id: 5, systemName: "replacement", friendlyName: "Replacing something old", typeId: ITEM_TYPE.PRODUCT },
    { id: 6, systemName: "treat", friendlyName: "Treating myself", typeId: ITEM_TYPE.PRODUCT },
    { id: 7, systemName: "maintenance", friendlyName: "Routine maintenance", typeId: ITEM_TYPE.SERVICE },
    { id: 8, systemName: "urgent_need", friendlyName: "Urgent need", typeId: ITEM_TYPE.SERVICE },
    { id: 9, systemName: "self_care", friendlyName: "Self-care", typeId: ITEM_TYPE.SERVICE },
    { id: 10, systemName: "recommended", friendlyName: "Someone recommended it", typeId: ITEM_TYPE.SERVICE },
    { id: 11, systemName: "celebration", friendlyName: "Special occasion", typeId: ITEM_TYPE.SERVICE },
];

export const consumptionInfluences: ConsumptionInfluence[] = [
    { id: 1, systemName: "price", friendlyName: "Price" },
    { id: 2, systemName: "quality", friendlyName: "Quality" },
    { id: 3, systemName: "brand", friendlyName: "Brand trust" },
    { id: 4, systemName: "recommendation", friendlyName: "Recommendation" },
    { id: 5, systemName: "advertising", friendlyName: "Advertising" },
    { id: 6, systemName: "convenience", friendlyName: "Convenience" },
    { id: 7, systemName: "habit", friendlyName: "Habit" },
];

export const negativeAspects: NegativeAspect[] = [
    { id: 1, systemName: "expensive", friendlyName: "Too expensive", typeId: ITEM_TYPE.PRODUCT },
    { id: 2, systemName: "low_quality", friendlyName: "Low quality", typeId: ITEM_TYPE.PRODUCT },
    { id: 3, systemName: "packaging", friendlyName: "Poor packaging", typeId: ITEM_TYPE.PRODUCT },
    { id: 4, systemName: "short_lifespan", friendlyName: "Didn't last long", typeId: ITEM_TYPE.PRODUCT },
    { id: 5, systemName: "taste", friendlyName: "Disappointing taste", typeId: ITEM_TYPE.PRODUCT },
    { id: 6, systemName: "hard_to_find", friendlyName: "Hard to find", typeId: ITEM_TYPE.PRODUCT },
    { id: 7, systemName: "slow_service", friendlyName: "Slow service", typeId: ITEM_TYPE.SERVICE },
    { id: 8, systemName: "rude_staff", friendlyName: "Unfriendly staff", typeId: ITEM_TYPE.SERVICE },
    { id: 9, systemName: "overpriced", friendlyName: "Not worth the price", typeId: ITEM_TYPE.SERVICE },
    { id: 10, systemName: "hard_booking", friendlyName: "Hard to book", typeId: ITEM_TYPE.SERVICE },
    { id: 11, systemName: "location", friendlyName: "Inconvenient location", typeId: ITEM_TYPE.SERVICE },
];

export function reasonsForType(typeId: ItemTypeId) {
    return consumptionReasons.filter((r) => r.typeId === typeId);
}

export function negativeAspectsForType(typeId: ItemTypeId) {
    return negativeAspects.filter((a) => a.typeId === typeId);
}

export function itemInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

/** "4990" -> "49,90" (BRL, digits-only masking) */
export function formatBRLFromDigits(digits: string) {
    const clean = digits.replace(/\D/g, "").slice(0, 11);
    if (!clean) return "";
    const cents = clean.padStart(3, "0");
    const int = cents.slice(0, -2).replace(/^0+(?=\d)/, "");
    const dec = cents.slice(-2);
    return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
}

export function brlDigitsToNumber(digits: string) {
    const clean = digits.replace(/\D/g, "");
    return clean ? Number(clean) / 100 : 0;
}