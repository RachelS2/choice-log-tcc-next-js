import { AnalyticsInsightsModel, BrandEvaluationInsightModel, BrandEvaluationModel, MinimumWageSpendingInsightModel, MostConsumedItemInsightModel, ReliableInfluenceInsightModel } from "@/models/dashboard/analytics";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { MINIMUM_WAGE } from "./utils";

function calculateMostReliableInfluence(
    consumptions: ReadConsumptionModel[]
): ReliableInfluenceInsightModel  {

    const influences = new Map<
        string,
        {
            totalRating: number;
            experiences: number;
            repurchases: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const influence = consumption.influence.friendlyName;

        const current = influences.get(influence) ?? {
            totalRating: 0,
            experiences: 0,
            repurchases: 0,
        };

        current.totalRating += consumption.rating;
        current.experiences += 1;

        if (consumption.wouldBuyAgain) {
            current.repurchases += 1;
        }

        influences.set(influence, current);
    });

    const result = Array.from(
        influences,
        ([influence, data]) => ({
            influence,
            averageRating:
                data.totalRating / data.experiences,
            repurchaseRate:
                (data.repurchases / data.experiences) * 100,
            experiences: data.experiences,
        })
    )
        .filter((item) => item.experiences >= 2)
        .sort(
            (a, b) =>
                b.averageRating - a.averageRating ||
                b.repurchaseRate - a.repurchaseRate
        );

    return result[0] ?? null;
}


export function calculateBrandEvaluationInsight(
    consumptions: ReadConsumptionModel[]
): BrandEvaluationInsightModel | null {
    const brands = new Map<
        string,
        {
            totalRating: number;
            experiences: number;
            repurchases: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const brand = consumption.item.brand;

        const current = brands.get(brand) ?? {
            totalRating: 0,
            experiences: 0,
            repurchases: 0,
        };

        current.totalRating += consumption.rating;
        current.experiences += 1;

        if (consumption.wouldBuyAgain) {
            current.repurchases += 1;
        }

        brands.set(brand, current);
    });

    const result: BrandEvaluationModel[] = Array.from(
        brands,
        ([brand, data]) => ({
            brand,
            averageRating: data.totalRating / data.experiences,
            repurchaseRate:
                (data.repurchases / data.experiences) * 100,
            experiences: data.experiences,
        })
    );

    if (result.length < 2) {
        return null;
    }

    const ranking = [...result].sort(
        (a, b) =>
            b.averageRating - a.averageRating ||
            b.repurchaseRate - a.repurchaseRate
    );

    const bestCandidate = ranking[0];
    const worstCandidate = ranking[ranking.length - 1];

    const bestTies = ranking.filter(
        (brand) =>
            brand.averageRating === bestCandidate.averageRating &&
            brand.repurchaseRate === bestCandidate.repurchaseRate
    );

    const worstTies = ranking.filter(
        (brand) =>
            brand.averageRating === worstCandidate.averageRating &&
            brand.repurchaseRate === worstCandidate.repurchaseRate
    );

    return {
        best: {
            status: bestTies.length > 1 ? "TIE" : "RESULT",
            brands: bestTies,
        },

        worst: {
            status: worstTies.length > 1 ? "TIE" : "RESULT",
            brands: worstTies,
        },
    };
}

function calculateMostConsumedItem(
    consumptions: ReadConsumptionModel[]
): MostConsumedItemInsightModel  {
    const items = new Map<
        string,
        {
            itemName: string;
            brand: string;
            experiences: number;
            totalSpent: number;
        }
    >();

    consumptions.forEach((consumption) => {
        const item = consumption.item;

        const current = items.get(item.id) ?? {
            itemName: item.friendlyName,
            brand: item.brand,
            experiences: 0,
            totalSpent: 0,
        };

        current.experiences += 1;
        current.totalSpent += consumption.price;

        items.set(item.id, current);
    });

    const result = Array.from(
        items,
        ([itemId, data]) => ({
            itemId,
            ...data,
        })
    ).sort(
        (a, b) =>
            b.experiences - a.experiences ||
            b.totalSpent - a.totalSpent
    );

    return result[0] ?? null;
}


function calculateMinimumWageSpending(
    consumptions: ReadConsumptionModel[]
): MinimumWageSpendingInsightModel {

    const totalSpent = consumptions.reduce(
        (total, consumption) =>
            total + consumption.price,
        0
    );

    return {
        totalSpent,
        equivalentMinimumWages:
            totalSpent / MINIMUM_WAGE.value,
    };
}

export function buildAnalyticsInsights(
    consumptions: ReadConsumptionModel[]
): AnalyticsInsightsModel {
    return {
        mostReliableInfluence:
            calculateMostReliableInfluence(consumptions),

        brandEvaluation:
            calculateBrandEvaluationInsight(consumptions),

        mostConsumedItem:
            calculateMostConsumedItem(consumptions),

        minimumWagesSpent:
            calculateMinimumWageSpending(consumptions),
    };
}