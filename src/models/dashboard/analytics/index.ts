import { ItemTypeEnum } from "../items";

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
    experiences: number;
}

export interface SpendingSatisfactionModel {
    price: number;
    rating: number;
    category: string;
    itemName: string;
}

export interface NegativeAspectSpendingModel {
    aspect: string;
    totalSpent: number;
    averageSpent: number;
    experiences: number;
}

export interface ConsumptionReasonModel {
    reason: string;
    experiences: number;
    percentage: number;
    averageRating: number;
    repurchaseRate: number;
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
        spendingSatisfactionByCategory: ExpensesByCategoryModel[];
        influences: InfluenceData[];
        influenceSatisfaction: InfluenceSatisfactionModel[];
        negativeAspectSpending: NegativeAspectSpendingModel[],
        consumptionReason: ConsumptionReasonModel[],
        satisfactionOverTime: SatisfactionOverTimeModel[]
    };
}

export interface ExpensesByCategoryModel {
    category: string;
    totalSpent: number;
    averageRating: number;
    experiences: number;
    wouldBuyAgain: number;
    wouldNotBuyAgain: number;
}

export interface SatisfactionOverTimeModel {
    period: string;
    totalSpent: number;
    averageRating: number;
    experiences: number;
}

export interface ReasonPerformanceModel {
    reason: string;
    experiences: number;
    percentage: number;
    averageRating: number;
    repurchaseRate: number;
}