import ConsumptionsHistoryPage from "@/components/dashboard/experiences/consumption-history-page";
import { ErrorConsumptionsState } from "@/components/dashboard/experiences/empty-state";
import { auth } from "@/lib/auth";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { fetchConsumptionInfluenceRepository, fetchConsumptionReasonsRepository, fetchConsumptionRepository, fetchNegativeAspectsRepository, updateConsumptionRepository } from "@/lib/repository/consumption-repository";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, EditConsumptionModel, NegativeAspectModel, ReadConsumptionModel } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";
import { headers } from "next/headers";

export default async function MyConsumptionsPage() {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        throw Error("User is not authorized to access this page");
    }

    const userId: string = session.user.id;

    try {

        const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(userId);

        const categories: CategoryModel[] = await fetchCategoriesRepository(userId);
        const consumptionInfluences: ConsumptionInfluenceModel[] = await fetchConsumptionInfluenceRepository()
        const consumptionReasons: ConsumptionReasonModel[] = await fetchConsumptionReasonsRepository()
        const negativeAspects: NegativeAspectModel[] = await fetchNegativeAspectsRepository()
        return <ConsumptionsHistoryPage 
            negativeAspects={negativeAspects}
            consumptionsWithItems={consumptions} categories={categories}
            consumptionInfluences={consumptionInfluences} consumptionReasons={consumptionReasons} />

    }

    catch (error) {
        console.error("Error fetching consumptions or categories:", error);
        return <ErrorConsumptionsState />
    }

}
