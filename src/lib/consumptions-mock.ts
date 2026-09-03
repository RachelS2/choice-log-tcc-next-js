// Mock data shaped exactly like the `ConsumptionModel` model and its relations.
// Swap `listConsumptions` for a real query later — the UI only depends on
// the types below.



export function formatRating(rating: number) {
    return rating.toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
}
