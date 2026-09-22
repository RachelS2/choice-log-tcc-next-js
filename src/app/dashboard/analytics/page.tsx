

import AnalyticsPageComponent from "@/components/dashboard/analytics/analytics-page";
import { ErrorNotification } from "@/components/ui/choicelog-notification-card";
import { buildAnalytics } from "@/lib/analytics-utils";
import { auth } from "@/lib/auth";
import { fetchConsumptionRepository } from "@/lib/repository/consumption-repository";

import { AnalyticsDataModel } from "@/models/dashboard/analytics";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";

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
        const userId: string = session.user.id;
        const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(userId);

        if (consumptions.length < 1) {
            return <ErrorNotification buttonText="Nova Experiência" redirectTo="/dashboard/experiences/new-experience"
                title="Você ainda não possui experiências para analisar." description="Comece a refletir sobre seus hábitos de compra agora." />
        }
        const analytics: AnalyticsDataModel = buildAnalytics(consumptions);


        return <AnalyticsPageComponent data={analytics} />
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
