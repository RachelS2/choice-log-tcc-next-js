import { AnalyticsConsumptionModel, AnalyticsDataModel, AnalyticsFiltersModel, BuyAgainByCategoryModel, CategoryValue, InfluenceData, InfluenceSatisfactionModel, SpendingSatisfactionModel } from "@/models/dashboard/analytics";

export function calculateAverageRating(
    consumptions: AnalyticsConsumptionModel[]
): number {
    if (consumptions.length === 0) return 0;

    const total = consumptions.reduce(
        (sum, consumption) => sum + consumption.rating,
        0
    );

    return total / consumptions.length;
}

export function calculateTotalSpent(
    consumptions: AnalyticsConsumptionModel[]
): number {
    return consumptions.reduce(
        (sum, consumption) => sum + consumption.price,
        0
    );
}

export function calculateSpencesByCategory(
    consumptions: AnalyticsConsumptionModel[]
): CategoryValue[] {
    const categories = new Map<string, number>();

    consumptions.forEach((consumption) => {
        const category = consumption.category.name;

        categories.set(
            category,
            (categories.get(category) ?? 0) + consumption.price
        );
    });

    return Array.from(categories, ([category, value]) => ({
        category,
        value,
    })).sort((a, b) => b.value - a.value);
}

export function calculateExperiencesByCategory(
    consumptions: AnalyticsConsumptionModel[]
): CategoryValue[] {
    const categories = new Map<string, number>();

    consumptions.forEach((consumption) => {
        const category = consumption.category.name;

        categories.set(
            category,
            (categories.get(category) ?? 0) + 1
        );
    });

    return Array.from(categories, ([category, value]) => ({
        category,
        value,
    })).sort((a, b) => b.value - a.value);
}

export function filterAnalyticsConsumptions(
    consumptions: AnalyticsConsumptionModel[],
    filters: AnalyticsFiltersModel
): AnalyticsConsumptionModel[] {
    return consumptions.filter((consumption) => {
        const matchesType =
            filters.type === "ALL" ||
            consumption.type === filters.type;

        const matchesCategory =
            filters.categoryId === null ||
            consumption.category.id === filters.categoryId;

        return matchesType && matchesCategory;
    });
}

export function calculateSatisfactionByCategory(
    consumptions: AnalyticsConsumptionModel[]
): CategoryValue[] {
    const categories = new Map<
        string,
        {
            totalRating: number;
            count: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const category = consumption.category.name;

        const current = categories.get(category) ?? {
            totalRating: 0,
            count: 0,
        };

        current.totalRating += consumption.rating;
        current.count += 1;

        categories.set(category, current);
    });

    return Array.from(categories, ([category, data]) => ({
        category,
        value: data.totalRating / data.count,
    })).sort((a, b) => b.value - a.value);
}



export function calculateBuyAgainByCategory(
    consumptions: AnalyticsConsumptionModel[]
): BuyAgainByCategoryModel[] {
    const categories = new Map<
        string,
        {
            yes: number;
            no: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const category = consumption.category.name;

        const current = categories.get(category) ?? {
            yes: 0,
            no: 0,
        };

        if (consumption.wouldBuyAgain) {
            current.yes += 1;
        } else {
            current.no += 1;
        }

        categories.set(category, current);
    });

    return Array.from(categories, ([category, data]) => {
        const total = data.yes + data.no;

        return {
            category,
            yes: (data.yes / total) * 100,
            no: (data.no / total) * 100,
        };
    });
}

export function calculateRepurchaseRate(
    consumptions: AnalyticsConsumptionModel[]
): number {
    if (consumptions.length === 0) return 0;

    const repurchases = consumptions.filter(
        (consumption) => consumption.wouldBuyAgain
    ).length;

    return (repurchases / consumptions.length) * 100;
}



export function calculateInfluences(
    consumptions: AnalyticsConsumptionModel[]
): InfluenceData[] {
    if (consumptions.length === 0) return [];

    const influences = new Map<string, number>();

    consumptions.forEach((consumption) => {
        const name = consumption.influence.friendlyName;

        influences.set(
            name,
            (influences.get(name) ?? 0) + 1
        );
    });

    return Array.from(influences, ([name, count]) => ({
        name,
        value: (count / consumptions.length) * 100,
    })).sort((a, b) => b.value - a.value);
}


export function calculateInfluenceSatisfaction(
    consumptions: AnalyticsConsumptionModel[]
): InfluenceSatisfactionModel[] {
    const influences = new Map<
        string,
        {
            count: number;
            totalRating: number;
            repurchases: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const name = consumption.influence.friendlyName;

        const current = influences.get(name) ?? {
            count: 0,
            totalRating: 0,
            repurchases: 0,
        };

        current.count += 1;
        current.totalRating += consumption.rating;

        if (consumption.wouldBuyAgain) {
            current.repurchases += 1;
        }

        influences.set(name, current);
    });

    return Array.from(influences, ([influence, data]) => ({
        influence,
        rating: data.totalRating / data.count,
        repurchase: (data.repurchases / data.count) * 100,
    })).sort((a, b) => b.rating - a.rating);
}

export function calculateSpencesXSatisfaction(
    consumptions: AnalyticsConsumptionModel[]
): SpendingSatisfactionModel[] {
    return consumptions.map((consumption) => ({
        price: consumption.price,
        rating: consumption.rating,
        category: consumption.category.name,
    }));
}

export function buildAnalytics(
    consumptions: AnalyticsConsumptionModel[]
) : AnalyticsDataModel {
    const categorySpending =
        calculateSpencesByCategory(consumptions);

    const experiencesByCategory =
        calculateExperiencesByCategory(consumptions);

    const satisfactionByCategory =
        calculateSatisfactionByCategory(consumptions);

    return {
        overview: {
            averageRating:
                calculateAverageRating(consumptions),
            
            totalExperiences: consumptions.length,
            
            totalSpent:
                calculateTotalSpent(consumptions),

            repurchaseRate:
                calculateRepurchaseRate(consumptions),

            highestSpendingCategory:
                categorySpending[0] ?? null,

            mostConsumedCategory:
                experiencesByCategory[0] ?? null,

            bestRatedCategory:
                satisfactionByCategory[0] ?? null,
        },

        charts: {
            categorySpending,
            experiencesByCategory,
            satisfactionByCategory,

            buyAgainByCategory:
                calculateBuyAgainByCategory(consumptions),

            influences:
                calculateInfluences(consumptions),

            influenceSatisfaction:
                calculateInfluenceSatisfaction(consumptions),

            spendingSatisfaction:
                calculateSpencesXSatisfaction(consumptions),
        },
    };
}