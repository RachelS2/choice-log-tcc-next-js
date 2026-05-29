import { ItemType } from "../../../../generated/prisma";

export type AddNewExperienceFormModel {
    itemId: string;
    itemType: ItemType;
    date: Date;
    price: string;
    reason: string;
    influence: string;
    rating: number;
    wouldBuyAgain: boolean;
    negativeAspects: string[];
    description: string;
    location: string;
}

export type AddNewExperienceFormStepsModel {
    currentStep: number;
    formData: AddNewExperienceFormModel;
    updateField: <K extends keyof AddNewExperienceFormModel>(field: K, value: AddNewExperienceFormModel[K]) => void;
}