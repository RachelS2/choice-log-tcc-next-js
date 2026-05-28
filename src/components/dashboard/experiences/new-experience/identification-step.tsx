'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences";
import { Calendar, DollarSign, ShoppingBag } from "lucide-react";
import { Step } from "./steps-abc";
import ProductSelector from "../../products/new-product/product-selector";




type IdentificationStepProps = AddNewExperienceFormStepsModel & { selectedId: string | null, setSelectedId: (id: string) => void };
export default function IdentificationStep({ currentStep, formData, updateField, selectedId, setSelectedId }: IdentificationStepProps) {

    return (
        <Step
            title="What did you consume?"
            description="Record the product or service you want to review."
            isActive={currentStep === 0}
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="item"
                        className="flex items-center gap-2 text-sm font-medium"
                    >
                        <ShoppingBag className="h-3.5 w-3.5 text-blue-500" />
                        Consumed item *
                    </Label>

                    <ProductSelector
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="date"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <Calendar className="h-3.5 w-3.5 text-blue-500" />
                            Data *
                        </Label>

                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => updateField("date", e.target.value)}
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="price"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <DollarSign className="h-3.5 w-3.5 text-blue-500" />
                            Price (R$)
                        </Label>

                        <Input
                            id="price"
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => updateField("price", e.target.value)}
                            className="h-11"
                        />
                    </div>
                </div>
            </div>
        </Step>
    )
}
