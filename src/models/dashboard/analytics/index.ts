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
    totalExperiences: number;
    spendingSatisfactionByCategory: ExpensesByCategoryModel[];
    influences: InfluenceData[];
    influenceSatisfaction: InfluenceSatisfactionModel[];
    negativeAspectSpending: NegativeAspectSpendingModel[],
    consumptionReason: ConsumptionReasonModel[],
    satisfactionOverTime: SatisfactionOverTimeModel[]
    insights: AnalyticsInsightsModel;
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

// INSIGHTS MODELS //

export interface AnalyticsInsightsModel {
    mostReliableInfluence: ReliableInfluenceInsightModel;
    brandEvaluation: BrandEvaluationInsightModel | null ;
    mostConsumedItem: MostConsumedItemInsightModel;
    minimumWagesSpent: MinimumWageSpendingInsightModel;
}

export interface ReliableInfluenceInsightModel {
    influence: string;
    averageRating: number;
    repurchaseRate: number;
    experiences: number;
}

export interface BrandEvaluationInsightModel {
    best: BrandEvaluationResult;
    worst: BrandEvaluationResult;
}

export interface BrandEvaluationResult {
    status: "RESULT" | "TIE";
    brands: BrandEvaluationModel[]
}


export interface BrandEvaluationModel {
    brand: string;
    averageRating: number;
    repurchaseRate: number;
    experiences: number;
}


export interface MostConsumedItemInsightModel {
    itemName: string;
    brand: string;
    experiences: number;
    totalSpent: number;
}

export interface MinimumWageSpendingInsightModel {
    totalSpent: number;
    equivalentMinimumWages: number;
}