import { ItemTypeEnum } from "../items";


export interface AnalyticsConsumptionModel {
    date: Date;
    price: number;
    rating: number;
    wouldBuyAgain: boolean;

    type: ItemTypeEnum;

    category: {
        id: string;
        name: string;
    };

    influence: {
        id: number;
        friendlyName: string;
    };
}


export interface AnalyticsFiltersModel {
    type: "ALL" | ItemTypeEnum;
    categoryId: string | null;

    consumptionDate: {
        startDate: Date | null;
        endDate: Date | null;
    };
}

export interface InfluenceData {
    name: string;
    value: number;
}

export interface BuyAgainByCategoryModel {
    category: string;
    yes: number;
    no: number;
}


export interface CategoryValue {
    category: string;
    value: number;
}

export interface InfluenceSatisfactionModel {
    influence: string;
    rating: number;
    repurchase: number;
}

export interface SpendingSatisfactionModel {
    price: number;
    rating: number;
    category: string;
}

export interface AnalyticsDataModel {
    overview: {
        averageRating: number;
        totalSpent: number;
        repurchaseRate: number;
        highestSpendingCategory: CategoryValue;
        mostConsumedCategory: CategoryValue;
        bestRatedCategory: CategoryValue;
        totalExperiences: number;
    };
    charts: {
        categorySpending: CategoryValue[];
        experiencesByCategory: CategoryValue[];
        satisfactionByCategory: CategoryValue[];
        buyAgainByCategory: BuyAgainByCategoryModel[];
        influences: InfluenceData[];
        influenceSatisfaction: InfluenceSatisfactionModel[];
        spendingSatisfaction: SpendingSatisfactionModel[];
    };
}