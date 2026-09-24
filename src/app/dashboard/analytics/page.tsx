

import AnalyticsPageComponent from "@/components/dashboard/analytics/analytics-page";
import { ErrorNotification } from "@/components/ui/choicelog-notification-card";
import { auth } from "@/lib/auth";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { fetchConsumptionInfluenceRepository, fetchConsumptionReasonsRepository, fetchConsumptionRepository, fetchNegativeAspectsRepository } from "@/lib/repository/consumption-repository";

import { ConsumptionInfluenceModel, ConsumptionReasonModel, NegativeAspectModel, ReadConsumptionModel } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default async function AnalyticsPage() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            redirect("/sign-in")
        }
        const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(session.user.id);

        if (consumptions.length < 1) {
            return <ErrorNotification buttonText="Nova Experiência" redirectTo="/dashboard/experiences/new-experience"
                title="Você ainda não possui experiências para analisar." description="Comece a refletir sobre seus hábitos de compra agora." />
        }
        const categories: CategoryModel[] = await fetchCategoriesRepository(session.user.id);
        const consumptionInfluences: ConsumptionInfluenceModel[] = await fetchConsumptionInfluenceRepository()
        const consumptionReasons: ConsumptionReasonModel[] = await fetchConsumptionReasonsRepository()
        const negativeAspects: NegativeAspectModel[] = await fetchNegativeAspectsRepository()
        return <AnalyticsPageComponent consumptionReasons={consumptionReasons} categories={categories} 
        consumptionInfluences={consumptionInfluences} 
        consumptions={consumptions} />
    }
    catch (error) {
        return (
            <ErrorNotification
                title="Não foi possível elaborar suas análises."
                description="Ocorreu um erro ao obter seus registros de consumo. Tente novamente em instantes."
            />
        )
    }
}
