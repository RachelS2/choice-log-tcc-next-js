import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import { Star } from "lucide-react";
import StarRating from "../StarRating";
import { Step } from "./steps-abc";


export default function FinalRatingStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {

    return (
        <Step
            title="Como foi a experiência?"
            description="Avalie sua satisfação com o produto ou serviço."
            isActive={currentStep === 4}
        >

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <Star className="h-3.5 w-3.5 text-blue-500" />
                        Nota geral
                    </Label>
                    <StarRating
                        value={formData.rating}
                        onChange={(val) => updateField("rating", val)}
                    />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                    <div className="space-y-0.5">
                        <Label className="text-sm font-medium">
                            Compraria novamente?
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Você recomendaria ou repetiria essa experiência?
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
