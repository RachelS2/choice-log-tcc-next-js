
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import ChipSelector from "../ChipSelector";
import { ConsumptionNegativeAspectsHelper } from "@/lib/enums";
import { Step } from "./steps-abc";


export default function FinalRatingStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    return (
        <Step
            title="Pontos negativos"
            description="Selecione os aspectos que poderiam melhorar."
            isActive={currentStep === 3}
        >

            <ChipSelector
                options={ConsumptionNegativeAspectsHelper.labels}
                selected={formData.negativeAspects}
                onChange={(val) => updateField("negativeAspects", val)}
                placeholder="Outro ponto negativo..."
            />
        </Step>
    )
}


