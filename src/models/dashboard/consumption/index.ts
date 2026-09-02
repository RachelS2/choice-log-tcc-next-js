import { BasicItemModel } from "../items";

export interface ConsumptionInfluenceModel {
    systemName: string;
    friendlyName: string;
    id: number;
}

export interface NegativeAspectModel extends ConsumptionInfluenceModel {
    typeId: number;
}

export interface ConsumptionReasonModel extends NegativeAspectModel {
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
