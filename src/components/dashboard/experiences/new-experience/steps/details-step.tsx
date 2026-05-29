import { Label } from "@/components/ui/label";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences";
import { FileText, MapPin, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Step } from "./steps-abc";

export default function DetailsStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {

    return (
        <Step
            title="Additional details"
            description="Extra information to enrich your record."
            isActive={currentStep === 2}
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Tell us more about your experience..."
                        value={formData.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        className="min-h-[80px] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-3.5 w-3.5 text-blue-500" />
                        Location
                    </Label>
                    <Input
                        id="location"
                        placeholder="Where was it? Ex: Mall, Online, Downtown..."
                        value={formData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        className="h-11"
                    />
                </div>
            </div>
        </Step>

    )
}
