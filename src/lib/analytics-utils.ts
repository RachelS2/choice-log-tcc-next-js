import { AnalyticsDataModel, AnalyticsFiltersModel, NegativeAspectSpendingModel, BuyAgainByCategoryModel, CategoryValue, InfluenceData, InfluenceSatisfactionModel, ReasonPerformanceModel, SatisfactionOverTimeModel, ExpensesByCategoryModel, SpendingSatisfactionModel } from "@/models/dashboard/analytics";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";

export function calculateAverageRating(
    consumptions: ReadConsumptionModel[]
): number {
    if (consumptions.length === 0) return 0;

    const total = consumptions.reduce(
        (sum, consumption) => sum + consumption.rating,
        0
    );

    return total / consumptions.length;
}

export function calculateTotalSpent(
    consumptions: ReadConsumptionModel[]
): number {
    return consumptions.reduce(
        (sum, consumption) => sum + consumption.price,
        0
    );
}

export function calculateSpencesByCategory(
    consumptions: ReadConsumptionModel[]
): CategoryValue[] {
    const categories = new Map<string, number>();

    consumptions.forEach((consumption) => {
        const category = consumption.item.categoryName;

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
    consumptions: ReadConsumptionModel[]
): CategoryValue[] {
    const categories = new Map<string, number>();

    consumptions.forEach((consumption) => {
        const category = consumption.item.categoryName;;

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
    consumptions: ReadConsumptionModel[],
    filters: AnalyticsFiltersModel
): ReadConsumptionModel[] {
    return consumptions.filter((consumption) => {
        const matchesType =
            filters.type === "ALL" ||
            consumption.item.type === filters.type;

        const matchesCategory =
            filters.categoryId === null ||
            consumption.item.categoryId === filters.categoryId;

        return matchesType && matchesCategory;
    });
}

export function calculateSatisfactionByCategory(
    consumptions: ReadConsumptionModel[]
): CategoryValue[] {
    const categories = new Map<
        string,
        {
            totalRating: number;
            count: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const category = consumption.item.categoryName;

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
    consumptions: ReadConsumptionModel[]
): BuyAgainByCategoryModel[] {
    const categories = new Map<
        string,
        {
            yes: number;
            no: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const category = consumption.item.categoryName;

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
    consumptions: ReadConsumptionModel[]
): number {
    if (consumptions.length === 0) return 0;

    const repurchases = consumptions.filter(
        (consumption) => consumption.wouldBuyAgain
    ).length;

    return (repurchases / consumptions.length) * 100;
}



export function calculateInfluences(
    consumptions: ReadConsumptionModel[]
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
    consumptions: ReadConsumptionModel[]
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
        experiences: data.count,
        rating: data.totalRating / data.count,
        repurchase: (data.repurchases / data.count) * 100,
    })).sort((a, b) => b.rating - a.rating);
}

export function combineSpendingAndSatisfaction(
    categorySpending: CategoryValue[],
    satisfactionByCategory: CategoryValue[],
    experiencesByCategory: CategoryValue[],
    buyAgainRates: BuyAgainByCategoryModel[]
): ExpensesByCategoryModel[] {
    return categorySpending.map((spending) => {
        const satisfaction = satisfactionByCategory.find(
            (item) => item.category === spending.category
        );

        const experiences = experiencesByCategory.find(
            (item) => item.category === spending.category
        );

        const buyAgainRate = buyAgainRates.find(
            (item) => item.category === spending.category
        );

        return {
            category: spending.category,
            totalSpent: spending.value,
            averageRating: satisfaction?.value ?? 0,
            experiences: experiences?.value ?? 0,
            wouldBuyAgain: buyAgainRate?.yes ?? 0,
            wouldNotBuyAgain: buyAgainRate?.no ?? 0,
        };
    });
}

export function calculateSpendingSatisfactionOverTime(
    consumptions: ReadConsumptionModel[]
): SatisfactionOverTimeModel[] {
    const periods = new Map<
        string,
        {
            year: number;
            month: number;
            totalSpent: number;
            totalRating: number;
            experiences: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const date = new Date(consumption.date);

        const year = date.getFullYear();
        const month = date.getMonth();

        const key = `${year}-${month}`;

        const current = periods.get(key) ?? {
            year,
            month,
            totalSpent: 0,
            totalRating: 0,
            experiences: 0,
        };

        current.totalSpent += consumption.price;
        current.totalRating += consumption.rating;
        current.experiences += 1;

        periods.set(key, current);
    });

    return Array.from(periods.values())
        .sort(
            (a, b) =>
                a.year - b.year ||
                a.month - b.month
        )
        .map((data) => ({
            period: new Date(
                data.year,
                data.month
            ).toLocaleDateString("pt-BR", {
                month: "short",
                year: "2-digit",
            }),
            totalSpent: data.totalSpent,
            averageRating:
                data.totalRating / data.experiences,
            experiences: data.experiences,
        }));
}

export function calculateNegativeAspectsSpending(
    consumptions: ReadConsumptionModel[]
): NegativeAspectSpendingModel[] {
    const aspects = new Map<
        string,
        {
            totalSpent: number;
            experiences: number;
        }
    >();

    consumptions.forEach((consumption) => {
        consumption.negativeAspects.forEach((aspect) => {
            const current = aspects.get(aspect.friendlyName) ?? {
                totalSpent: 0,
                experiences: 0,
            };

            current.totalSpent += consumption.price;
            current.experiences += 1;

            aspects.set(aspect.friendlyName, current);
        });
    });

    return Array.from(aspects, ([aspect, data]) => ({
        aspect,
        totalSpent: data.totalSpent,
        averageSpent:
            data.totalSpent / data.experiences,
        experiences: data.experiences,
    })).sort(
        (a, b) => b.totalSpent - a.totalSpent
    );
}

export function calculateReasonPerformance(
    consumptions: ReadConsumptionModel[]
): ReasonPerformanceModel[] {

    const reasons = new Map<
        string,
        {
            experiences: number;
            totalRating: number;
            repurchases: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const reason = consumption.reason.friendlyName;

        const current = reasons.get(reason) ?? {
            experiences: 0,
            totalRating: 0,
            repurchases: 0,
        };

        current.experiences += 1;
        current.totalRating += consumption.rating;

        if (consumption.wouldBuyAgain) {
            current.repurchases += 1;
        }

        reasons.set(reason, current);
    });

    return Array.from(reasons, ([reason, data]) => ({
        reason,
        experiences: data.experiences,

        percentage:
            (data.experiences / consumptions.length) * 100,

        averageRating:
            data.totalRating / data.experiences,

        repurchaseRate:
            (data.repurchases / data.experiences) * 100,
    })).sort((a, b) => b.experiences - a.experiences);
}

export function buildAnalytics(
    consumptions: ReadConsumptionModel[]
): AnalyticsDataModel {
    const categorySpending: CategoryValue[] =
        calculateSpencesByCategory(consumptions);

    const experiencesByCategory: CategoryValue[] =
        calculateExperiencesByCategory(consumptions);

    const satisfactionByCategory: CategoryValue[] =
        calculateSatisfactionByCategory(consumptions);

    const buyAgainByCategory: BuyAgainByCategoryModel[] = calculateBuyAgainByCategory(consumptions);

    const spendingSatisfactionByCategory: ExpensesByCategoryModel[] =
        combineSpendingAndSatisfaction(
            categorySpending,
            satisfactionByCategory,
            experiencesByCategory,
            buyAgainByCategory
        );
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

            influences:
                calculateInfluences(consumptions),

            negativeAspectSpending: calculateNegativeAspectsSpending(consumptions),

            spendingSatisfactionByCategory: spendingSatisfactionByCategory,

            consumptionReason:
                calculateReasonPerformance(consumptions),

            influenceSatisfaction:
                calculateInfluenceSatisfaction(consumptions),

            satisfactionOverTime: calculateSpendingSatisfactionOverTime(consumptions)
        },
    };
}