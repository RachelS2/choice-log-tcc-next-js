'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";
import { Calendar } from "./calendar";
import { format, parse, isValid } from "date-fns";

interface DatePickerProps {
    value?: Date;
    onChange: (date: Date) => void;
    error?: string;
    putCalendarIcon: boolean

}

function formatDateInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;
    if (digits.length <= 4)
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function DatePicker({
    value,
    onChange,
    error,
    putCalendarIcon,
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (value) {
            setInputValue(format(value, "dd/MM/yyyy"));
        }
    }, [value]);

    const handleChange = (raw: string) => {
        const masked = formatDateInput(raw);
        setInputValue(masked);

        if (masked.length !== 10) return;

        const parsed = parse(masked, "dd/MM/yyyy", new Date());

        if (!isValid(parsed)) return;
        if (parsed > new Date()) return;

        onChange(parsed);
    };

    return (
        <div className="space-y-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div>
                        {putCalendarIcon ? (<CalendarIcon className="mr-2 h-4 w-4" onClick={() => setOpen((prev) => !prev)} />) : null}

                        <Input
                            value={inputValue}
                            placeholder="dd/mm/aaaa"
                            onChange={(e) => handleChange(e.target.value)}
                            className={cn(
                                "h-11",
                                error && "border-red-500 focus-visible:ring-red-500"
                            )}
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent side="bottom" align="start" className="p-0">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(d) => {
                            if (d) {
                                onChange(d);
                                setOpen(false);
                            }
                        }}
                        disabled={(d) => d > new Date()}
                    />
                </PopoverContent>
            </Popover>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}