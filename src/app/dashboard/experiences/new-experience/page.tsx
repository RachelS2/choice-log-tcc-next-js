
import RegisterConsumptionPageClient from "@/components/dashboard/experiences/new-experience/register-consumption-page";
import { postConsumptionController } from "@/lib/controller/consumption-controller";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { fetchNegativeAspectsRepository, fetchConsumptionReasonsRepository, fetchConsumptionInfluenceRepository } from "@/lib/repository/consumption-repository";
import { fetchItemBasicInfoRepository, fetchItemTypesRepository, postItemRepository } from "@/lib/repository/item-repository";
import { NegativeAspectModel, ConsumptionReasonModel, ConsumptionInfluenceModel } from "@/models/dashboard/consumption";
import { BasicItemModel, CategoryModel, ItemResumeModel, ItemTypeModel, PostItemModel } from "@/models/dashboard/items";
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export default async function RegisterConsumptionPage() {

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw Error("Usuário não está autorizado a acessar esta página.");
    }

    const userId = session.user.id;
    const items: BasicItemModel[] = await fetchItemBasicInfoRepository(userId);
    const negativeAspects: NegativeAspectModel[] =
      await fetchNegativeAspectsRepository();
    const consumptionReasons: ConsumptionReasonModel[] =
      await fetchConsumptionReasonsRepository();

    const categories: CategoryModel[] = await fetchCategoriesRepository()
    const itemTypes: ItemTypeModel[] = await fetchItemTypesRepository()

    const consumptionInfluence: ConsumptionInfluenceModel[] = await fetchConsumptionInfluenceRepository()
    async function onPostItem(itemToPost: PostItemModel): Promise<ItemResumeModel> {
      "use server";

      return await postItemRepository(itemToPost, userId);
    }
    return (
      <RegisterConsumptionPageClient
        initialItems={items}
        aspects={negativeAspects}
        reasons={consumptionReasons}
        categories={categories}
        itemTypes={itemTypes}
        consumptionInfluences={consumptionInfluence}
        postConsumption={postConsumptionController}
        postItem={ onPostItem}
      />);
  }

  catch (error) {
    console.error("Error fetching data for RegisterConsumptionPage:", error);
    throw new Error("Failed to fetch data for register consumption page ");
  }
}