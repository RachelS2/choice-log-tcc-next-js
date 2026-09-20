

import AnalyticsPageComponent from "@/components/dashboard/analytics/analytics-page";
import { ErrorNotification } from "@/components/ui/choicelog-notification-card";
import { buildAnalytics, filterAnalyticsConsumptions } from "@/lib/analytics-utils";
import { auth } from "@/lib/auth";
import {
    fetchAnalyticsConsumptionsRepository
} from "@/lib/repository/analytics-repository";
import { AnalyticsConsumptionModel, AnalyticsDataModel } from "@/models/dashboard/analytics";

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
        const consumptions: AnalyticsConsumptionModel[] = await fetchAnalyticsConsumptionsRepository(userId);

        const analytics: AnalyticsDataModel = buildAnalytics(consumptions);


        return <AnalyticsPageComponent data={analytics} />
    }
    catch (error) {
        console.error("Error fetching consumptions or categories:", error);
        "use client";
        return (
        <ErrorNotification
            title="Não foi possível elaborar suas análises."
            description="Ocorreu um erro ao obter seus registros de consumo. Tente novamente em instantes."
        />
    )
    }
}
