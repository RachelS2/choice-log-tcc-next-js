'use client';
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";
import { Calendar } from "./calendar";
import { format, parse, isValid, isBefore } from "date-fns";
import { Button } from "./button";

interface DatePickerProps {
    value?: Date;
    onChange: (date: Date) => void;
    putCalendarIcon: boolean
    setError: (error: string | undefined) => void;
    error: string | undefined;
    showCalendar? : boolean;
    dateInputClassName? : string;
}

export function DatePicker({
    value,
    onChange,
    putCalendarIcon,
    setError,
    error,
    showCalendar,
    dateInputClassName
}: DatePickerProps) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        if (value) {
            setInputValue(format(value, "dd/MM/yyyy"));
        } else {
            setInputValue("");
        }
    }, [value]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let input = e.target.value.replace(/\D/g, "");

        if (input.length > 8) {
            input = input.slice(0, 8);
        }

        if (input.length >= 5) {
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
        } else if (input.length >= 3) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }

        setInputValue(input);

        if (input.length === 10) {
            const date = parse(
                input,
                "dd/MM/yyyy",
                new Date()
            );

            const validDate =
                isValid(date) &&
                input === format(date, "dd/MM/yyyy") &&
                !isBefore(today, date);

            if (validDate) {
                onChange(date);
                setError(undefined);
                setOpen(false);
            } else {
                setError("Data inválida.");
            }
            return;
        }

        setError(undefined)
    };

    return (
        <div className="space-y-1 ">
            <Popover open={open} onOpenChange={setOpen}>
                <div
                    className={cn(
                        "flex h-11 w-full shadow-sm items-center rounded-md border  bg-white",
                        error && "border-red-500"
                    )}
                >
                    {putCalendarIcon && (
                        <CalendarIcon className="ml-3 size-4 shrink-0 text-neutral-500" />
                    )}

                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="dd/mm/aaaa"
                        maxLength={10}
                        className={cn(
                            "h-full w-full text-center bg-transparent px-1 text-sm text-black outline-none",
                            "placeholder:text-muted-foreground", dateInputClassName
                        )}
                    />

                    {showCalendar && <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            className=" size-9 shrink-0 p-0 hover:bg-blue-50 hover:font-semibold hover:text-neutral-900"
                        >
                            <ChevronDown className="text-neutral-700 size-4" />
                        </Button>
                    </PopoverTrigger> }
                </div>

                <PopoverContent
                    className="z-[100] w-auto border border-neutral-200 p-0"
                    align="start"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Calendar
                        className="rounded-2xl "
                        mode="single"
                        autoFocus
                        selected={value}
                        onSelect={(d) => {
                            if (d) {
                                onChange(d);
                                setInputValue(format(d, "dd/MM/yyyy"));
                                setOpen(false);
                            }
                        }}
                        disabled={(d) => d > today}
                        classNames={{
                            day_button:
                                "hover:!bg-blue-50 hover:!text-blue-600 focus:!bg-blue-50 focus:!text-blue-600",
                        }}
                    />
                </PopoverContent>
            </Popover>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}