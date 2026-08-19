import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function YesNoChoice({
    value,
    onChange,
}: {
    value: boolean | null;
    onChange: (v: boolean | null) => void;
}) {
    const options: { label: string; val: boolean; Icon: typeof ThumbsUp }[] = [
        { label: "Yes", val: true, Icon: ThumbsUp },
        { label: "No", val: false, Icon: ThumbsDown },
    ];
    return (
        <div className="flex flex-wrap items-center gap-3">
            {options.map(({ label, val, Icon }) => {
                const selected = value === val;
                return (
                    <button
                        key={label}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onChange(selected ? null : val)}
                        className={cn(
                            "inline-flex cursor-pointer shadow-sm flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm transition-all duration-200 sm:flex-none",
                            "hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/60",
                            selected
                                ? "border-primary bg-primary/10 font-medium text-primary shadow-sm"
                                : "border-border bg-background text-muted-foreground",
                        )}
                    >
                        <Icon className="size-4" />
                        {label}
                    </button>
                );
            })}
            {/* {value !== null ? (
                <button
                    type="button"
                    onClick={() => onChange(null)}
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                    Clear
                </button>
            ) : null} */}
        </div>
    );
}