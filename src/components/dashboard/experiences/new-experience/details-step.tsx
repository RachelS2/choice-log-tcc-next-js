import { Label } from "@/components/ui/label";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import { FileText, MapPin, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Step } from "./steps-abc";

export default function DetailsStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {

    return (
        <Step
            title="Detalhes adicionais"
            description="Informações extras para enriquecer seu registro."
            isActive={currentStep === 2}
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                        <FileText className="h-3.5 w-3.5 text-purple-500" />
                        Descrição
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Conte mais sobre sua experiência..."
                        value={formData.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        className="min-h-[100px] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-3.5 w-3.5 text-purple-500" />
                        Local
                    </Label>
                    <Input
                        id="location"
                        placeholder="Onde foi? Ex: Shopping, Online, Centro..."
                        value={formData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        className="h-11"
                    />
                </div>
            </div>
        </Step>

    )
}
