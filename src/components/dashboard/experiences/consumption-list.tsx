import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import {
  ConsumptionCard,
  ConsumptionCardSkeleton
} from "./consumption-card";

export interface ConsumptionListProps {
  consumptions: ReadConsumptionModel[];
  loading?: boolean;
  onOpen: (c: ReadConsumptionModel) => void;
}
export function ConsumptionList({
  consumptions,
  loading,
  onOpen,
}: ConsumptionListProps) {
  console.log("Loading: " + loading);
  if (loading) {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <ConsumptionCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {consumptions.map((c) => (
        <ConsumptionCard key={c.id} consumptionAndItem={c} onOpen={onOpen} />
      ))}
    </div>
  );
}
