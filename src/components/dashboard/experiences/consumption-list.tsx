import type { Consumption } from "@/lib/consumptions-mock";
import { ConsumptionCard, ConsumptionCardSkeleton } from "./consumption-card";

export function ConsumptionList({
  consumptions,
  loading,
  onOpen,
}: {
  consumptions: Consumption[];
  loading?: boolean;
  onOpen: (c: Consumption) => void;
}) {
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
        <ConsumptionCard key={c.id} consumption={c} onOpen={onOpen} />
      ))}
    </div>
  );
}
