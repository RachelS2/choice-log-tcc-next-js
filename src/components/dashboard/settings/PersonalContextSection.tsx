import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserProfile } from '@/app/dashboard/settings/page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export interface PersonalContextSectionProps {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
    isEditing: boolean;
}

const incomeOptions = [
    { value: 'UP_TO_1_MINIMUM_WAGE', label: 'Up to 1 minimum wage' },
    { value: 'FROM_1_TO_3', label: 'From 1 to 3 minimum wages' },
    { value: 'FROM_3_TO_5', label: 'From 3 to 5 minimum wages' },
    { value: 'FROM_5_TO_10', label: 'From 5 to 10 minimum wages' },
    { value: 'ABOVE_10', label: 'Above 10 minimum wages' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

export default function PersonalContextSection({
    profile,
    updateProfile,
    isEditing,
}: PersonalContextSectionProps) {
    return (
        <Card className="bg-white/80 backdrop-blur-md border-neutral-200 shadow-md">

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
                        value={profile.incomeRange}
                        disabled={!isEditing}
                        onValueChange={(value) =>
                            updateProfile({ incomeRange: value })
                        }
                    >
                        <SelectTrigger id="income-range" className="w-full h-11">
                            <SelectValue placeholder="Select your income range" />
                        </SelectTrigger>

                        <SelectContent>
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