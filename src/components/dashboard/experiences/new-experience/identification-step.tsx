import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddNewExperienceFormStepsModel } from "@/models/dashboard/experiences/new-experience";
import { Calendar, DollarSign, ShoppingBag } from "lucide-react";


export default function IdentificationStep({ currentStep, formData, updateField }: AddNewExperienceFormStepsModel) {
    return (
        <div className="px-6 pb-6 ">
            <div
                className="animate-in fade-in slide-in-from-right-4 duration-300"
                key={currentStep}
            >
                {currentStep === 0 && (
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                O que você consumiu?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Registre o produto ou serviço que deseja avaliar.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="item"
                                    className="flex items-center gap-2 text-sm font-medium"
                                >
                                    <ShoppingBag className="h-3.5 w-3.5 text-purple-500" />
                                    Item consumido *
                                </Label>

                                <Input
                                    id="item"
                                    placeholder="Ex: Café especial, Curso online, Restaurante..."
                                    value={formData.item}
                                    onChange={(e) => updateField("item", e.target.value)}
                                    className="h-11"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="date"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Calendar className="h-3.5 w-3.5 text-purple-500" />
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
                                        <DollarSign className="h-3.5 w-3.5 text-purple-500" />
                                        Preço (R$)
                                    </Label>

                                    <Input
                                        id="price"
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0,00"
                                        value={formData.price}
                                        onChange={(e) => updateField("price", e.target.value)}
                                        className="h-11"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}