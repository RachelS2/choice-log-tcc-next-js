'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";
import { Calendar } from "./calendar";
import { format, parse, isValid } from "date-fns";
import { Button } from "./button";

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
        <div className="space-y-1 bg-white">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="bg-white hover:text-black" asChild>
                    <Button
                        type="button"
                        className={cn(
                            "h-11 w-full justify-start bg-white font-normal text-black",
                            "hover:bg-white hover:text-black",
                            "focus:bg-white focus:text-black",
                            "focus-visible:bg-white focus-visible:text-black",
                            !value && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="size-4" />
                        {value ? format(value, "PPP") : "Select a date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                    <Calendar
                        className="rounded-2xl border border-neutral-200"
                        mode="single"
                        selected={value}
                        onSelect={(d) => {
                            if (d) {
                                onChange(d);
                                setOpen(false);
                            }
                        }}
                        disabled={(d) => d > new Date()}
                        autoFocus
                        classNames={{
                            day_button:
                                "hover:!bg-blue-50 hover:!text-blue-600 focus:!bg-blue-50 focus:!text-blue-600",
                        }}
                    />
                </PopoverContent>
            </Popover>


            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}