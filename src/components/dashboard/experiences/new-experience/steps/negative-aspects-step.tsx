
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences";
import ChipSelector from "../../ChipSelector";
import { ConsumptionNegativeAspectsHelper } from "@/lib/enums";
import { Step } from "./steps-abc";


export default function FinalRatingStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    return (
        <Step
            title="Negative points"
            description="Select the aspects that could improve."
            isActive={currentStep === 3}
        >

            <ChipSelector
                options={ConsumptionNegativeAspectsHelper.labels}
                selected={formData.negativeAspects}
                onChange={(val) => updateField("negativeAspects", val)}
                placeholder="Other negative point..."
            />
        </Step>
    )
}


