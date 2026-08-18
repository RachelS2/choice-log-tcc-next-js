import { X, ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const CONSUMPTION_REASONS: string[] = [
  'Need',
  'Impulse',
  'Gift',
  'Recommendation',
  'Replacement',
  'Other',
];

export const NEGATIVE_ASPECTS: string[] = [
  'Price too high',
  'Poor quality',
  'Slow shipping',
  'Bad packaging',
  'Difficult to use',
  "Didn't meet expectations",
  'Short lifespan',
];

interface ReflectionSectionProps {
  reason: string;
  onReasonChange: (value: string) => void;
  negativeAspects: string[];
  onNegativeAspectsChange: (value: string[]) => void;
  notes: string;
  onNotesChange: (value: string) => void;
}

export default function ReflectionSection({
  reason,
  onReasonChange,
  negativeAspects,
  onNegativeAspectsChange,
  notes,
  onNotesChange,
}: ReflectionSectionProps) {
  const [aspectsOpen, setAspectsOpen] = useState(false);

  const toggleAspect = (aspect: string) => {
    if (negativeAspects.includes(aspect)) {
      onNegativeAspectsChange(negativeAspects.filter((a) => a !== aspect));
    } else {
      onNegativeAspectsChange([...negativeAspects, aspect]);
    }
  };

  const removeAspect = (aspect: string) => {
    onNegativeAspectsChange(negativeAspects.filter((a) => a !== aspect));
  };

  return (
    <div className="space-y-6">
      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason">Why did you buy it?</Label>
        <Select value={reason} onValueChange={onReasonChange}>
          <SelectTrigger id="reason" className="bg-white">
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            {CONSUMPTION_REASONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Negative aspects multi-select */}
      <div className="space-y-2">
        <Label>Negative aspects (optional)</Label>
        <Popover open={aspectsOpen} onOpenChange={setAspectsOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className="w-full justify-between bg-white font-normal"
            >
              <span className="text-gray-500">
                {negativeAspects.length > 0
                  ? `${negativeAspects.length} selected`
                  : 'Select aspects you disliked...'}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search aspects..." />
              <CommandList>
                <CommandEmpty>No aspect found.</CommandEmpty>
                <CommandGroup>
                  {NEGATIVE_ASPECTS.map((aspect) => {
                    const selected = negativeAspects.includes(aspect);
                    return (
                      <CommandItem
                        key={aspect}
                        value={aspect}
                        onSelect={() => toggleAspect(aspect)}
                      >
                        <div
                          className={cn(
                            'mr-2 h-4 w-4 rounded border flex items-center justify-center',
                            selected
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300 bg-white'
                          )}
                        >
                          {selected && (
                            <svg
                              viewBox="0 0 16 16"
                              className="h-3 w-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        {aspect}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {negativeAspects.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {negativeAspects.map((aspect) => (
              <Badge
                key={aspect}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 pl-3 pr-1 py-1 gap-1"
              >
                {aspect}
                <button
                  type="button"
                  onClick={() => removeAspect(aspect)}
                  className="ml-1 rounded-full hover:bg-blue-200 p-0.5"
                  aria-label={`Remove ${aspect}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Additional notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Write any extra thoughts about this purchase..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={4}
          className="bg-white resize-none"
        />
      </div>
    </div>
  );
}