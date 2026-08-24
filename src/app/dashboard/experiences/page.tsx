
import RegisterConsumptionPageClient from "@/components/dashboard/experiences/new-experience/register-consumption-page-client";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { fetchNegativeAspectsRepository, fetchConsumptionReasonsRepository } from "@/lib/repository/consumption-repository";
import { fetchItemBasicInfoRepository, fetchItemTypesRepository } from "@/lib/repository/item-repository";
import { NegativeAspectModel, ConsumptionReasonModel } from "@/models/dashboard/consumption";
import { BasicItemModel, CategoryModel, ItemTypeModel } from "@/models/dashboard/items";


export default async function RegisterConsumptionPage() {
  const items: BasicItemModel[] = await fetchItemBasicInfoRepository();
  const negativeAspects: NegativeAspectModel[] =
    await fetchNegativeAspectsRepository();
  const consumptionReasons: ConsumptionReasonModel[] =
    await fetchConsumptionReasonsRepository();

  const categories: CategoryModel[] = await fetchCategoriesRepository()
  const itemTypes: ItemTypeModel[] = await fetchItemTypesRepository()

  return (
    <RegisterConsumptionPageClient
      initialItems={items}
      aspects={negativeAspects}
      reasons={consumptionReasons}
      categories={categories}
      itemTypes= {itemTypes}
    />
  );
}