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

interface PersonalContextSectionProps {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
}

const incomeOptions = [
    { value: 'UP_TO_1_MINIMUM_WAGE', label: 'Até 1 salário mínimo' },
    { value: 'FROM_1_TO_3', label: 'De 1 a 3 salários mínimos' },
    { value: 'FROM_3_TO_5', label: 'De 3 a 5 salários mínimos' },
    { value: 'FROM_5_TO_10', label: 'De 5 a 10 salários mínimos' },
    { value: 'ABOVE_10', label: 'Acima de 10 salários mínimos' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefiro não informar' },
];

export default function PersonalContextSection({
    profile,
    updateProfile,
}: PersonalContextSectionProps) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-950 mb-1">Contexto Pessoal</h2>
            <p className="text-sm text-neutral-500 mb-6">
                Informações opcionais que ajudam a personalizar suas reflexões.
            </p>

            <div className="space-y-4 max-w-sm">
                <div className="space-y-2">
                    <Label htmlFor="income-range" className="text-sm font-medium text-neutral-700">
                        Faixa de renda
                    </Label>
                    <Select
                        value={profile.incomeRange}
                        onValueChange={(value) => updateProfile({ incomeRange: value })}
                    >
                        <SelectTrigger id="income-range" className="w-full">
                            <SelectValue placeholder="Selecione sua faixa de renda" />
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

                {/* Privacy notice */}
                <div className="flex items-start gap-2.5 rounded-xl bg-blue-50/70 border border-blue-100 p-4">
                    <Info className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-blue-800">
                            Por que pedimos essa informação?
                        </p>
                        <p className="text-xs leading-relaxed text-blue-700/80">
                            Sua faixa de renda nos ajuda a contextualizar suas reflexões de consumo —
                            nunca para julgar. Essa informação é privada e usada apenas para gerar
                            insights mais relevantes sobre seus hábitos de compra.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}