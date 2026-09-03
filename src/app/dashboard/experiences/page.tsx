import ConsumptionsHistoryPage from "@/components/dashboard/experiences/consumption-history-page";
import { auth } from "@/lib/auth";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { fetchConsumptionRepository } from "@/lib/repository/consumption-repository";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";
import { headers } from "next/headers";

export default async function MyConsumptionsPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        throw Error("User is not authorized to access this page");
    }

    const consumptions: ReadConsumptionModel[] = await fetchConsumptionRepository(session.user.id);

    const categories: CategoryModel[] = await fetchCategoriesRepository(session.user.id);

    return <ConsumptionsHistoryPage consumptionsWithItems={consumptions} categories={categories} />
}
