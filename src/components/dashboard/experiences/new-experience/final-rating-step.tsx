import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import { Star } from "lucide-react";
import StarRating from "../StarRating";


export default function FinalRatingStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    return currentStep === 4 && (
        <div className="space-y-5">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                    Como foi a experiência?
                </h3>
                <p className="text-sm text-muted-foreground">
                    Avalie sua satisfação com o produto ou serviço.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                        <Star className="h-3.5 w-3.5 text-purple-500" />
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
        </div>
    )
}
