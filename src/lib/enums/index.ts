

import { createEnumHelpers } from "./utils";
import { LABELS } from "./labels";
import { ConsumptionInfluence, ConsumptionReason, ConsumptionNegativeAspects } from "../../../generated/prisma";

export const ConsumptionInfluenceHelper = createEnumHelpers(
  ConsumptionInfluence,
  LABELS.ConsumptionInfluence
);

export const ConsumptionReasonHelper = createEnumHelpers(
  ConsumptionReason,
  LABELS.ConsumptionReason
);

export const ConsumptionNegativeAspectsHelper = createEnumHelpers(
  ConsumptionNegativeAspects,
  LABELS.ConsumptionNegativeAspects
);