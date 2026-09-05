import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
    rating,
    size = "sm",
    showValue = true,
}: {
    rating: number;
    size?: "sm" | "lg";
    showValue?: boolean;
}) {
    const dim = size === "lg" ? "size-5" : "size-4";
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5" aria-hidden>
                {[1, 2, 3, 4, 5].map((n) => {
                    const filled = rating >= n;
                    const half = !filled && rating >= n - 0.5;
                    if (half) {
                        return (
                            <span key={n} className={cn("relative", dim)}>
                                <Star className={cn(dim, "absolute inset-0 text-muted-foreground/30")} />
                                <StarHalf className={cn(dim, "relative fill-primary text-primary")} />
                            </span>
                        );
                    }
                    return (
                        <Star
                            key={n}
                            className={cn(
                                dim,
                                filled
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground/30",
                            )}
                        />
                    );
                })}
            </div>
            {showValue ? (
                <span
                    className={cn(
                        "font-medium text-foreground",
                        size === "lg" ? "text-base" : "text-sm",
                    )}
                >
                    {rating}
                </span>
            ) : null}
            <span className="sr-only">{rating} de 5</span>
        </div>
    );
}
