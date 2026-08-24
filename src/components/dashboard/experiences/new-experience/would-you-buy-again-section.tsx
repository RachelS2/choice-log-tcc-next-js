import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function YesNoChoice({
    value,
    onChange,
}: {
    value: boolean | null;
    onChange: (v: boolean | null) => void;
}) {
    const options: {
        label: string;
        val: boolean;
        Icon: typeof ThumbsUp;
    }[] = [
            { label: "Yes", val: true, Icon: ThumbsUp },
            { label: "No", val: false, Icon: ThumbsDown },
        ];

    return (
        <div className="flex flex-wrap items-center gap-3">
            {options.map(({ label, val, Icon }) => {
                const selected = value === val;
                const isYes = val === true;

                return (
                    <button
                        key={label}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onChange(selected ? null : val)}
                        className={cn(
                            "group inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium shadow-sm transition-all duration-200 ease-out sm:flex-none",

                            // Estado normal
                            !selected &&
                            "border-border bg-background text-muted-foreground",

                            // Hover Yes
                            !selected &&
                            isYes &&
                            "hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50 hover:text-green-600 hover:shadow-md",

                            // Hover No
                            !selected &&
                            !isYes &&
                            "hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-md",

                            // Selecionado - Yes
                            selected &&
                            isYes &&
                            "border-green-500 bg-green-50 text-green-600 shadow-md shadow-green-100",

                            // Selecionado - No
                            selected &&
                            !isYes &&
                            "border-red-500 bg-red-50 text-red-600 shadow-md shadow-red-100",

                            // Feedback de clique
                            "active:scale-95",
                        )}
                    >
                        <Icon
                            className={cn(
                                "size-4 transition-all duration-200",

                                // Animação do Yes
                                selected &&
                                isYes &&
                                "animate-yes-feedback",

                                // Animação do No
                                selected &&
                                !isYes &&
                                "animate-no-feedback",
                            )}
                        />

                        <span
                            className={cn(
                                "transition-all duration-200",
                                selected && "font-semibold",
                            )}
                        >
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}