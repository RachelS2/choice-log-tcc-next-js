import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { UserSettingsSchemaType } from '@/zod-schemas/user-settings';
import { IncomeRange } from '../../../../../generated/prisma';

export interface PersonalContextSectionProps {
    isEditing: boolean;
    setValue: UseFormSetValue<UserSettingsSchemaType>;
    watch: UseFormWatch<UserSettingsSchemaType>;
}


const incomeOptions: { value: IncomeRange; label: string }[] = [
    { value: 'UP_TO_1_MINIMUM_WAGE', label: 'Até 1 salário mínimo' },
    { value: 'FROM_1_TO_3', label: 'De 1 a 3 salários mínimos' },
    { value: 'FROM_3_TO_5', label: 'De 3 a 5 salários mínimos' },
    { value: 'FROM_5_TO_10', label: 'De 5 a 10 salários mínimos' },
    { value: 'ABOVE_10', label: 'Acima de 10 salários mínimos' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefiro não informar' },
];

export default function PersonalContextSection({
    isEditing, setValue, watch
}: PersonalContextSectionProps) {
    return (
        <Card className="bg-white backdrop-blur-md border shadow-lg
border
border-blue-100
shadow-[0_2px_20px_rgba(59,130,246,0.05)]">

            {/* Header */}
            <CardHeader>
                <CardTitle className="text-lg text-neutral-950">
                    Contexto pessoal
                </CardTitle>
                <CardDescription className="text-sm text-neutral-500">
                    Informações opcionais que ajudam a personalizar suas análises.
                </CardDescription>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-5">

                {/* Income */}
                <div className="space-y-2 w-full">
                    <Label
                        htmlFor="income-range"
                        className="text-sm font-medium text-neutral-700"
                    >
                        Faixa de renda
                    </Label>
                    <Select
                        value={watch("incomeRange") ?? "PREFER_NOT_TO_SAY"}
                        disabled={!isEditing}
                        onValueChange={(value) =>
                            setValue(
                                "incomeRange",
                                value as IncomeRange,
                                {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                }
                            )
                        }
                    >
                        <SelectTrigger id="income-range" size="lg" className={cn(
                            "w-full h-10 text-neutral-600 shadow-sm transition-all",
                            !isEditing
                                ? "bg-neutral-50 cursor-not-allowed"
                                : "bg-white"

                        )}>
                            <SelectValue placeholder="Selecione sua faixa de renda" />
                        </SelectTrigger>

                        <SelectContent position="popper"

                            side="bottom"
                            align="start">
                            {incomeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Info box */}
                <div className="flex items-start gap-3 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                    <Info className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />

                    <div className="space-y-1">
                        <p className="text-xs font-medium text-blue-800">
                            Por que perguntamos isso?
                        </p>

                        <p className="text-xs leading-relaxed text-blue-700/80">
                            Sua faixa de renda nos ajuda a contextualizar suas análises de consumo. 
                            Essas informação é privada e é usada apenas para gerar
                            insights mais relevantes sobre seus hábitos de compra.
                        </p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}