export interface MostSpentCategory {
    name: string;
    value: number;
}

export interface MostLikedCategory extends MostSpentCategory {
}

export interface AnalyticsData {
    totalExperiences: number;
    mostSpentCategory: MostSpentCategory;
    mostLikedCategory: MostLikedCategory;
    avgRating: number;
    repurchaseRate: number;

}