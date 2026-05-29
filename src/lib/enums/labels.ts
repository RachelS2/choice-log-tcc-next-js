import { ConsumptionInfluence, ConsumptionReason, ConsumptionNegativeAspects } from "../../../generated/prisma";


export const LABELS = {
    ConsumptionInfluence: {
        [ConsumptionInfluence.SOCIAL_MEDIA]: 'Social Media',
        [ConsumptionInfluence.FRIENDS_FAMILY]: 'Friends or Family',
        [ConsumptionInfluence.SOCIETY_TREND]: 'Society Trend',
        [ConsumptionInfluence.OWN_RESEARCH]: 'Own Research',
        [ConsumptionInfluence.IMPULSIVITY]: 'Impulsivity',
        [ConsumptionInfluence.EMERGENCY]: 'Emergency Situation',
        [ConsumptionInfluence.SELLER_INFLUENCE]: 'Seller Influence',
        [ConsumptionInfluence.REDUCED_COST]: 'Discounts',
        [ConsumptionInfluence.OTHER]: 'Other',
    },

    ProductConsumptionReason: {
        [ConsumptionReason.ITEM_REPLACEMENT]: 'Replace Item',
        [ConsumptionReason.EFFECTIVENESS_TEST]: 'Test Effectiveness',
        [ConsumptionReason.PERSONAL_SATISFACTION]: 'Personal Satisfaction',
        [ConsumptionReason.SOCIAL_ALIGNMENT]: 'Social Alignment',
        [ConsumptionReason.OTHER]: 'Other',
    },

    ProductConsumptionNegativeAspects: {
        [ConsumptionNegativeAspects.INEFFECTIVE]: 'Item was Ineffective',
        [ConsumptionNegativeAspects.LOW_QUALITY]: 'Poor Quality',
        [ConsumptionNegativeAspects.LOW_DURABILITY]: 'Short Lifespan',
        [ConsumptionNegativeAspects.POOR_DESIGN]: 'Bad Design or Package',
        [ConsumptionNegativeAspects.UNSAFE]: 'Dangerous To Use',
        [ConsumptionNegativeAspects.POOR_CUSTOMER_SERVICE]: 'Poor Customer Service',
        [ConsumptionNegativeAspects.OTHER]: 'Other',
    }
};