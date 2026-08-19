"use client";
import { Star, StarHalf } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";


const LABELS: Record<number, string> = {
  0.5: "Not great",
  1: "Not great",
  1.5: "Not great",
  2: "Okay",
  2.5: "Okay",
  3: "Good",
  3.5: "Good",
  4: "Very good",
  4.5: "Very good",
  5: "Loved it",
};

export function RatingStars({
  value,
  onChange,
  editable = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  editable?: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);

  const active = editable && hover !== null ? hover : value;

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    if (!editable) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;

    setHover(isLeftHalf ? star - 0.5 : star);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    if (!editable) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;

    const rating = isLeftHalf ? star - 0.5 : star;

    onChange?.(rating);
  };

  const renderStar = (star: number) => {
    const fillAmount = Math.max(0, Math.min(1, active - (star - 1)));

    return (
      <button
        key={star}
        type="button"
        disabled={!editable}
        aria-label={`${star - 0.5} to ${star} stars`}
        onMouseMove={(e) => handleMouseMove(e, star)}
        onClick={(e) => handleClick(e, star)}
        className={cn(
          "relative rounded-md p-1",
          editable &&
            "transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
          !editable && "cursor-default",
        )}
      >
        <div className="relative size-8">
          {/* Empty star */}
          <Star
            className="absolute inset-0 size-8 text-muted-foreground/40"
          />

          {/* Filled portion */}
          {fillAmount > 0 && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                width: `${fillAmount * 100}%`,
              }}
            >
              <Star className="size-8 fill-primary text-primary" />
            </div>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className="flex gap-1"
        onMouseLeave={() => editable && setHover(null)}
      >
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>

      <span className="text-sm text-muted-foreground">
        {active > 0
          ? `${LABELS[active]}`
          : editable
            ? "Tap to rate"
            : "Not rated"}
      </span>
    </div>
  );
}