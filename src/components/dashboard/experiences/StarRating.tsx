import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function StarRating({ value, onChange, max = 5 }: StarRatingProps) {
  const [hovered, setHovered] = useState<number>(0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-300"
            }`}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">
          {value}/{max}
        </span>
      )}
    </div>
  );
}