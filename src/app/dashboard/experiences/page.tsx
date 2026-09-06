import ConsumptionsHistoryPage from "@/components/dashboard/experiences/consumption-history-page";
import { ErrorConsumptionsState } from "@/components/dashboard/experiences/empty-state";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { fetchConsumptionInfluenceRepository, fetchConsumptionReasonsRepository, fetchConsumptionRepository } from "@/lib/repository/consumption-repository";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, ReadConsumptionModel } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";
import { AlertTriangle } from "lucide-react";
import { headers } from "next/headers";

export default async function MyConsumptionsPage() {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        throw Error("User is not authorized to access this page");
    }

    try {

        const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(session.user.id);

        const categories: CategoryModel[] = await fetchCategoriesRepository(session.user.id);
        const consumptionInfluences: ConsumptionInfluenceModel[] = await fetchConsumptionInfluenceRepository()
        const consumptionReasons: ConsumptionReasonModel[] = await fetchConsumptionReasonsRepository()
        return <ConsumptionsHistoryPage consumptionsWithItems={consumptions} categories={categories} consumptionInfluences={consumptionInfluences} consumptionReasons={consumptionReasons} />

    }

    catch (error) {
        console.error("Error fetching consumptions or categories:", error);
        return <ErrorConsumptionsState />
    }

}
