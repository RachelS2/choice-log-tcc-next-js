

import AnalyticsPageComponent from "@/components/dashboard/analytics/analytics-page";
import { auth } from "@/lib/auth";
import { fetchTotalExperiencesRepository } from "@/lib/repository/analytics-repository";
import { headers } from "next/headers";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default async function AnalyticsPage() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            throw Error("Usuário não está autorizado a acessar esta página.");
        }

        const userId: string = session.user.id;


        const totalExperiences = await fetchTotalExperiencesRepository(userId)
        return <AnalyticsPageComponent />
    }
    catch (error) {
        console.error("Error fetching consumptions or categories:", error);
        return <ErrorConsumptionsState />
    }
}
