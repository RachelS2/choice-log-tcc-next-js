import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConsumptionInfluenceHelper, ConsumptionReasonHelper } from "@/lib/enums";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences";
import { Brain, Users } from "lucide-react";
import { Step } from "./steps-abc";

const REASONS = Object.values(
  ConsumptionReasonHelper.labels
);

const CONSUMPTION_INFLUENCE = Object.values(
  ConsumptionInfluenceHelper.labels
);

export default function ContextStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    console.log(ConsumptionReasonHelper.labels)
    return (
        <Step
            title="Decision context"
            description="What motivated this purchase or consumption?"
            isActive={currentStep === 1}
        >

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <Brain className="h-3.5 w-3.5 text-blue-500" />
                        Purchase reason
                    </Label>
                    <Select
                        value={formData.reason}
                        onValueChange={(val) => updateField("reason", val)}
                    >
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select a reason..." />
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
                        <Users className="h-3.5 w-3.5 text-blue-500" />
                        Main influence
                    </Label>
                    <Select
                        value={formData.influence}
                        onValueChange={(val) => updateField("influence", val)}
                    >
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="What influenced your decision?" />
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
