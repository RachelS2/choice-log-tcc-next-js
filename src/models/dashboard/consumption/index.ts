import { BasicItemModel } from "../items";

export interface ConsumptionInfluenceModel {
    friendlyName: string;
    id: number;
}

export interface ConsumptionReasonModel extends ConsumptionInfluenceModel {
}

export interface NegativeAspectModel extends ConsumptionReasonModel {
    typeId: number;
}


interface ConsumptionBaseModel {

    date: Date;
    address: string | null;
    rating: number;
    details: string | null;
    price: number;
    wouldBuyAgain: boolean;
}

export interface CreateConsumptionModel extends ConsumptionBaseModel {
    itemId: string;
    reasonId: number;
    influenceId: number;
    negativeAspects: number[]
}

export interface ReadConsumptionModel extends ConsumptionBaseModel {
    item: BasicItemModel;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    wishListItemId: string | null;
    reason: ConsumptionReasonModel;
    influence: ConsumptionInfluenceModel;
    negativeAspects: NegativeAspectModel[];
}

export type SortItemsOptions = 'recent' | 'last_consumed' | 'most_experiences' | 'alphabetical' | 'most_spent';

export type SortConsumptionsOptions =
    | "recent"
    | "oldest"
    | "rating_desc"
    | "rating_asc"
    | "most_spent"
    | "least_spent";