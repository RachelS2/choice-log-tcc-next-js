import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConsumptionInfluenceHelper, ConsumptionReasonHelper } from "@/lib/enums";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import { Brain, Users } from "lucide-react";
import { Step } from "./steps-abc";

const REASONS: string[] = ConsumptionReasonHelper.labels;

const CONSUMPTION_INFLUENCE: string[] = ConsumptionInfluenceHelper.labels;

export default function ContextStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    return (
        <Step
            title="Contexto da decisão"
            description="O que motivou essa compra ou consumo?"
            isActive={currentStep === 1}
        >

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <Brain className="h-3.5 w-3.5 text-purple-500" />
                        Motivo da compra
                    </Label>
                    <Select
                        value={formData.reason}
                        onValueChange={(val) => updateField("reason", val)}
                    >
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecione o motivo..." />
                        </SelectTrigger>
                        <SelectContent>
                            {REASONS.map((reason) => (
                                <SelectItem key={reason} value={reason}>
                                    {reason}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <Users className="h-3.5 w-3.5 text-purple-500" />
                        Influência principal
                    </Label>
                    <Select
                        value={formData.influence}
                        onValueChange={(val) => updateField("influence", val)}
                    >
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="O que influenciou sua decisão?" />
                        </SelectTrigger>
                        <SelectContent>
                            {CONSUMPTION_INFLUENCE.map((influence) => (
                                <SelectItem key={influence} value={influence}>
                                    {influence}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </Step >
    );
}
