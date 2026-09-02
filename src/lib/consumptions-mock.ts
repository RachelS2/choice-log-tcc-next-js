// Mock data shaped exactly like the `ConsumptionModel` model and its relations.
// Swap `listConsumptions` for a real query later — the UI only depends on
// the types below.

import {
    ITEM_TYPE,
    consumptionInfluences,
    consumptionReasons,
    negativeAspects,
    type ConsumptionInfluence,
    type ConsumptionReason,
    type Item,
    type NegativeAspect,
} from "./consumption-data";

export interface ConsumptionModel {
    id: string;
    userId: string;
    itemId: string;
    wishListItemId: string | null;
    wouldBuyAgain: boolean | null;
    price: number;
    rating: number; // 0 - 5, half points allowed
    details: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string;
    date: string;
    influenceId: number;
    reasonId: number;
    item: Item;
    influence: ConsumptionInfluence;
    reason: ConsumptionReason;
    negativeAspects: NegativeAspect[];
}

const catalog: Item[] = [
    { id: "itm_1", name: "Café Gourmet Signature", brand: "Nortada Coffee", category: "Alimentação", typeId: ITEM_TYPE.PRODUCT },
    { id: "itm_2", name: "Massagem Relaxante", brand: "Serena Spa", category: "Bem-estar", typeId: ITEM_TYPE.SERVICE },
    { id: "itm_3", name: "Tênis de Corrida Pace 4", brand: "Atlan", category: "Calçados", typeId: ITEM_TYPE.PRODUCT },
    { id: "itm_4", name: "Corte de Cabelo Masculino", brand: "Barbearia Vale", category: "Beleza", typeId: ITEM_TYPE.SERVICE },
    { id: "itm_5", name: "Fone Bluetooth Aura", brand: "Kyon", category: "Eletrônicos", typeId: ITEM_TYPE.PRODUCT },
    { id: "itm_6", name: "Jantar Degustação", brand: "Casa Lume", category: "Restaurantes", typeId: ITEM_TYPE.SERVICE },
    { id: "itm_7", name: "Cafeteira Italiana 6 xícaras", brand: "Bricco", category: "Casa", typeId: ITEM_TYPE.PRODUCT },
    { id: "itm_8", name: "Assinatura Streaming Premium", brand: "Vibra", category: "Entretenimento", typeId: ITEM_TYPE.SERVICE },
    { id: "itm_9", name: "Camiseta Algodão Pima", brand: "Norte Básicos", category: "Vestuário", typeId: ITEM_TYPE.PRODUCT },
    { id: "itm_10", name: "Lavagem Automotiva Detalhada", brand: "AutoBrilho", category: "Automotivo", typeId: ITEM_TYPE.SERVICE },
    { id: "itm_11", name: "Whey Protein Baunilha", brand: "Fortis", category: "Suplementos", typeId: ITEM_TYPE.PRODUCT },
    { id: "itm_12", name: "Aula de Yoga Avulsa", brand: "Studio Raiz", category: "Bem-estar", typeId: ITEM_TYPE.SERVICE },
];

const detailSamples = [
    "Experiência bem acima do esperado, voltaria sem pensar duas vezes.",
    "Atendeu ao que prometia, mas nada memorável.",
    "O preço pesou bastante para o que foi entregue.",
    "Qualidade excelente, só a espera que foi longa demais.",
    null,
    null,
    "Comprei por indicação e não me arrependi.",
];

const addressSamples = [
    "Rua das Laranjeiras, 240 — São Paulo, SP",
    "Av. Beira Mar, 1180 — Florianópolis, SC",
    null,
    "Shopping Central, Loja 32 — Campinas, SP",
    null,
];

/** Deterministic pseudo-random so SSR and client render the same list. */
function rng(seed: number) {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}

function buildConsumptions(total: number): ConsumptionModel[] {
    const rand = rng(20260829);
    const today = new Date("2026-08-29T12:00:00Z");
    const list: ConsumptionModel[] = [];

    for (let i = 0; i < total; i += 1) {
        const item = catalog[Math.floor(rand() * catalog.length)]!;
        const reasons = consumptionReasons.filter((r) => r.typeId === item.typeId);
        const aspects = negativeAspects.filter((a) => a.typeId === item.typeId);
        const reason = reasons[Math.floor(rand() * reasons.length)]!;
        const influence =
            consumptionInfluences[Math.floor(rand() * consumptionInfluences.length)]!;

        const daysAgo = Math.floor(rand() * 400);
        const date = new Date(today.getTime() - daysAgo * 86400000);

        const rating = Math.round((2 + rand() * 3) * 2) / 2; // 2 .. 5 com meios pontos
        const wbaRoll = rand();
        const wouldBuyAgain =
            wbaRoll < 0.62 ? true : wbaRoll < 0.85 ? false : null;

        const aspectCount = rating >= 4 ? (rand() < 0.25 ? 1 : 0) : Math.floor(rand() * 3);
        const picked: NegativeAspect[] = [];
        for (let a = 0; a < aspectCount; a += 1) {
            const candidate = aspects[Math.floor(rand() * aspects.length)]!;
            if (!picked.some((p) => p.id === candidate.id)) picked.push(candidate);
        }

        list.push({
            id: `cns_${(i + 1).toString().padStart(3, "0")}`,
            userId: "usr_1",
            itemId: item.id,
            wishListItemId: null,
            wouldBuyAgain,
            price: Math.round((8 + rand() * 480) * 100) / 100,
            rating,
            details: detailSamples[Math.floor(rand() * detailSamples.length)] ?? null,
            address: addressSamples[Math.floor(rand() * addressSamples.length)] ?? null,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            date: date.toISOString(),
            influenceId: influence.id,
            reasonId: reason.id,
            item,
            influence,
            reason,
            negativeAspects: picked,
        });
    }

    return list;
}

export const mockConsumptions = buildConsumptions(48);

export const consumptionCategories = Array.from(
    new Set(catalog.map((i) => i.category)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

export function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function formatRating(rating: number) {
    return rating.toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
}
