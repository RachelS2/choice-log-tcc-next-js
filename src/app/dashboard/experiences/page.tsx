
import RegisterConsumptionPageClient from "@/components/dashboard/experiences/new-experience/register-consumption-page-client";
import { fetchNegativeAspectsRepository, fetchConsumptionReasonsRepository } from "@/lib/repository/consumption-repository";
import { fetchItemBasicInfoRepository } from "@/lib/repository/item-repository";
import { NegativeAspectModel, ConsumptionReasonModel } from "@/models/dashboard/consumption";
import { BasicItemModel } from "@/models/dashboard/items";


export default async function RegisterConsumptionPage() {
  const items: BasicItemModel[] = await fetchItemBasicInfoRepository();
  const negativeAspects: NegativeAspectModel[] =
    await fetchNegativeAspectsRepository();
  const consumptionReasons: ConsumptionReasonModel[] =
    await fetchConsumptionReasonsRepository();

  return (
    <RegisterConsumptionPageClient
      items={items}
      aspects={negativeAspects}
      reasons={consumptionReasons}
    />
  );
}