

import { createEnumHelpers } from "./utils";
import { LABELS } from "./labels";
import { ConsumptionInfluence, ConsumptionReason, ConsumptionNegativeAspects } from "../../../generated/prisma";

export const ConsumptionInfluenceHelper = createEnumHelpers(
  ConsumptionInfluence,
  LABELS.ConsumptionInfluence
);

export const ConsumptionReasonHelper = createEnumHelpers(
  ConsumptionReason,
  LABELS.ProductConsumptionReason
);

export const ConsumptionNegativeAspectsHelper = createEnumHelpers(
  ConsumptionNegativeAspects,
  LABELS.ProductConsumptionNegativeAspects
);