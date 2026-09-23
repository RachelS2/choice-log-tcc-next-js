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


export function calculateRepurchaseRate(
    consumptions: ReadConsumptionModel[]
): number {
    if (consumptions.length === 0) return 0;

    const repurchases = consumptions.filter(
        (consumption) => consumption.wouldBuyAgain
    ).length;

    return (repurchases / consumptions.length) * 100;
}

