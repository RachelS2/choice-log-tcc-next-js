import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import {
  ConsumptionCard,
  ConsumptionCardSkeleton
} from "./consumption-card";

export interface ConsumptionListProps {
  consumptions: ReadConsumptionModel[];
  onOpen: (c: ReadConsumptionModel) => void;
}
export function ConsumptionList({
  consumptions,
  onOpen,
}: ConsumptionListProps) {

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {consumptions.map((c) => (
        <ConsumptionCard key={c.id} consumptionAndItem={c} onOpen={onOpen} />
      ))}
    </div>
  );
}
