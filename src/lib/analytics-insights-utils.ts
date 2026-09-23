import { BrandEvaluationInsightModel, BrandEvaluationModel, MostConsumedItemInsightModel, ReliableInfluenceInsightModel } from "@/models/dashboard/analytics";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";

export function calculateMostReliableInfluence(
    consumptions: ReadConsumptionModel[]
): ReliableInfluenceInsightModel | null {
    if (!consumptions.length) return null;

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
        }
    >();

    consumptions.forEach((consumption) => {
        const brand = consumption.item.brand;

        const current = brands.get(brand) ?? {
            totalRating: 0,
            experiences: 0,
        };

        current.totalRating += consumption.rating;
        current.experiences += 1;

        brands.set(brand, current);
    });

    const result: BrandEvaluationModel[] = Array.from(
        brands,
        ([brand, data]) => ({
            brand,
            averageRating:
                data.totalRating / data.experiences,
            experiences: data.experiences,
        })
    )
        .filter((brand) => brand.experiences >= 2)
        .sort(
            (a, b) =>
                b.averageRating - a.averageRating
        );

    if (result.length < 2) {
        return null;
    }

    return {
        best: result[0],
        worst: result[result.length - 1],
    };
}

export function calculateMostConsumedItem(
    consumptions: ReadConsumptionModel[]
): MostConsumedItemInsightModel | null {
    if (!consumptions.length) return null;

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

