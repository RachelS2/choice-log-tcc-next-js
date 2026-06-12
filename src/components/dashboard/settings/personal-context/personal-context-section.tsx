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
    { value: 'UP_TO_1_MINIMUM_WAGE', label: 'Up to 1 minimum wage' },
    { value: 'FROM_1_TO_3', label: 'From 1 to 3 minimum wages' },
    { value: 'FROM_3_TO_5', label: 'From 3 to 5 minimum wages' },
    { value: 'FROM_5_TO_10', label: 'From 5 to 10 minimum wages' },
    { value: 'ABOVE_10', label: 'Above 10 minimum wages' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
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
                    Personal Context
                </CardTitle>
                <CardDescription className="text-sm text-neutral-500">
                    Optional information that helps personalize your insights.
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
                        Income Range
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
                            <SelectValue placeholder="Select your income range" />
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
                            Why do we ask for this information?
                        </p>

                        <p className="text-xs leading-relaxed text-blue-700/80">
                            Your income range helps us contextualize your consumption insights —
                            never to judge. This information is private and used only to generate
                            more relevant insights about your purchasing habits.
                        </p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}