import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences";
import { Star } from "lucide-react";
import StarRating from "../StarRating";
import { Step } from "./steps-abc";


export default function FinalRatingStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {

    return (
        <Step
            title="How was the experience?"
            description="Rate your satisfaction with the product or service."
            isActive={currentStep === 4}
        >

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <Star className="h-3.5 w-3.5 text-blue-500" />
                        Overall rating
                    </Label>
                    <StarRating
                        value={formData.rating}
                        onChange={(val) => updateField("rating", val)}
                    />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                    <div className="space-y-0.5">
                        <Label className="text-sm font-medium">
                            Would you buy again?
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Would you recommend or repeat this experience?
                        </p>
                    </div>
                    <Switch
                        checked={formData.wouldBuyAgain}
                        onCheckedChange={(val) => updateField("wouldBuyAgain", val)}
                    />
                </div>
            </div>
        </Step>
    )
}
