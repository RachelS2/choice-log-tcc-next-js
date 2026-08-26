
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


export interface CreateConsumptionModel {
    itemId: string;
    date: Date;
    address: string | null;
    rating: number;
    details: string | null;
    reasonId: number;
    influenceId: number;
    price: number;
    wouldBuyAgain: boolean;
    negativeAspects: number[]
}

export interface ConsumptionModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    date: Date;
    wouldBuyAgain: boolean | null;
    price: number;
    rating: number;
    details: string | null;
    address: string | null;
    itemId: string;
    wishListItemId: string | null;
    influenceId: number;
    reasonId: number;
}
