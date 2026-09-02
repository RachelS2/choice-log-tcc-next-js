import ConsumptionsHistoryPage from "@/components/dashboard/experiences/consumption-history-page";
import { auth } from "@/lib/auth";
import { fetchConsumptionRepository } from "@/lib/repository/consumption-repository";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { headers } from "next/headers";

export default async function MyConsumptionsPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        throw Error("User is not authorized to access this page");
    }
    const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(session.user.id);

    console.log("Consumptions: " + consumptions.map((c) => c.item.friendlyName).join(", "));

    return <ConsumptionsHistoryPage consumptionsWithItems={consumptions}/>
}
