'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences";
import { CalendarIcon, DollarSign, ShoppingBag } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Step } from "./steps-abc";
import ProductSelector from "../../../products/new-product/product-selector";
import { useState } from "react";
import DatePicker from "@/components/ui/date-picker";

export default function IdentificationStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    return (
        <Step
            title="What did you consume?"
            description="Record the product or service you want to review."
            isActive={currentStep === 0}
        >
            <div>
                <div className="space-y-2 pb-4">
                    <Label
                        htmlFor="item"
                        className="flex items-center gap-2 text-sm font-medium"
                    >
                        <ShoppingBag className="h-3.5 w-3.5 text-blue-500" />
                        Consumed item *
                    </Label>

                    <ProductSelector
                        selectedId={formData.itemId}
                        updateField={updateField}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="date"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <CalendarIcon className="h-3.5 w-3.5 text-blue-500" />
                            Consumption Date *
                        </Label>
                        <DatePicker putCalendarIcon={false} onChange={(d) => {
                            if (d) {
                                updateField("date", d);
                                setDatePickerOpen(false);
                            }
                        }} value={formData.date} />

                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="price"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <DollarSign className="h-3.5 w-3.5 text-blue-500" />
                            Price (R$) *
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
        </Step >
    )
}
