
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import ChipSelector from "../ChipSelector";
import { ConsumptionNegativeAspectsHelper } from "@/lib/enums";


export default function FinalRatingStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    return currentStep === 3 && (
        <div className="space-y-5">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                    Pontos negativos
                </h3>
                <p className="text-sm text-muted-foreground">
                    Selecione os aspectos que poderiam melhorar.
                </p>
            </div>

            <ChipSelector
                options={ConsumptionNegativeAspectsHelper.labels}
                selected={formData.negativeAspects}
                onChange={(val) => updateField("negativeAspects", val)}
                placeholder="Outro ponto negativo..."
            />
        </div>
    )
}
