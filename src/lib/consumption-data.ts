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
  { id: 1, systemName: "routine", friendlyName: "Faz parte da minha rotina", typeId: ITEM_TYPE.PRODUCT },
  { id: 2, systemName: "necessity", friendlyName: "Eu precisava", typeId: ITEM_TYPE.PRODUCT },
  { id: 3, systemName: "impulse", friendlyName: "Impulso", typeId: ITEM_TYPE.PRODUCT },
  { id: 4, systemName: "gift", friendlyName: "Foi um presente", typeId: ITEM_TYPE.PRODUCT },
  { id: 5, systemName: "replacement", friendlyName: "Substituição de algo antigo", typeId: ITEM_TYPE.PRODUCT },
  { id: 6, systemName: "treat", friendlyName: "Me presentear", typeId: ITEM_TYPE.PRODUCT },
  { id: 7, systemName: "maintenance", friendlyName: "Manutenção de rotina", typeId: ITEM_TYPE.SERVICE },
  { id: 8, systemName: "urgent_need", friendlyName: "Necessidade urgente", typeId: ITEM_TYPE.SERVICE },
  { id: 9, systemName: "self_care", friendlyName: "Autocuidado", typeId: ITEM_TYPE.SERVICE },
  { id: 10, systemName: "recommended", friendlyName: "Alguém recomendou", typeId: ITEM_TYPE.SERVICE },
  { id: 11, systemName: "celebration", friendlyName: "Ocasião especial", typeId: ITEM_TYPE.SERVICE },
];

export const consumptionInfluences: ConsumptionInfluence[] = [
  { id: 1, systemName: "price", friendlyName: "Preço" },
  { id: 2, systemName: "quality", friendlyName: "Qualidade" },
  { id: 3, systemName: "brand", friendlyName: "Confiança na marca" },
  { id: 4, systemName: "recommendation", friendlyName: "Recomendação" },
  { id: 5, systemName: "advertising", friendlyName: "Publicidade" },
  { id: 6, systemName: "convenience", friendlyName: "Conveniência" },
  { id: 7, systemName: "habit", friendlyName: "Hábito" },
];

export const negativeAspects: NegativeAspect[] = [
  { id: 1, systemName: "expensive", friendlyName: "Muito caro", typeId: ITEM_TYPE.PRODUCT },
  { id: 2, systemName: "low_quality", friendlyName: "Baixa qualidade", typeId: ITEM_TYPE.PRODUCT },
  { id: 3, systemName: "packaging", friendlyName: "Embalagem ruim", typeId: ITEM_TYPE.PRODUCT },
  { id: 4, systemName: "short_lifespan", friendlyName: "Durou pouco", typeId: ITEM_TYPE.PRODUCT },
  { id: 5, systemName: "taste", friendlyName: "Sabor decepcionante", typeId: ITEM_TYPE.PRODUCT },
  { id: 6, systemName: "hard_to_find", friendlyName: "Difícil de encontrar", typeId: ITEM_TYPE.PRODUCT },
  { id: 7, systemName: "slow_service", friendlyName: "Atendimento lento", typeId: ITEM_TYPE.SERVICE },
  { id: 8, systemName: "rude_staff", friendlyName: "Equipe pouco simpática", typeId: ITEM_TYPE.SERVICE },
  { id: 9, systemName: "overpriced", friendlyName: "Não vale o preço", typeId: ITEM_TYPE.SERVICE },
  { id: 10, systemName: "hard_booking", friendlyName: "Difícil de agendar", typeId: ITEM_TYPE.SERVICE },
  { id: 11, systemName: "location", friendlyName: "Localização inconveniente", typeId: ITEM_TYPE.SERVICE },
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