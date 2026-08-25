"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LABELS: Record<number, string> = {
  1: "Not great",
  2: "Okay",
  3: "Good",
  4: "Very good",
  5: "Loved it",
};

export function RatingStars({
  value,
  onChange,
  editable = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  editable?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: {
      container: "size-[clamp(1.25rem,6vw,1.5rem)]",
      star: "size-[clamp(1.25rem,6vw,1.5rem)]",
      button: "p-0",
      gap: "gap-[clamp(0.125rem,0.8vw,0.25rem)]",
    },

    md: {
      container: "size-[clamp(1.5rem,7vw,2rem)]",
      star: "size-[clamp(1.5rem,7vw,2rem)]",
      button: "p-1",
      gap: "gap-[clamp(0.125rem,1vw,0.5rem)]",
    },

    lg: {
      container: "size-[clamp(1.75rem,8vw,2.5rem)]",
      star: "size-[clamp(1.75rem,8vw,2.5rem)]",
      button: "p-1",
      gap: "gap-[clamp(0.125rem,1vw,0.5rem)]",
    },
  };

  const currentSize = sizeClasses[size];

  const [hover, setHover] = useState<number | null>(null);

  const active = editable && hover !== null ? hover : value;

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    if (!editable) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf =
      e.clientX - rect.left < rect.width / 2;

    setHover(isLeftHalf ? star - 0.5 : star);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    if (!editable) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf =
      e.clientX - rect.left < rect.width / 2;

    const rating = isLeftHalf ? star - 0.5 : star;

    onChange?.(rating);
  };

  const renderStar = (star: number) => {
    const fillAmount = Math.max(
      0,
      Math.min(1, active - (star - 1)),
    );

    return (
      <div
        key={star}
        className="group relative flex shrink-0 items-center"
      >
        <button
          type="button"
          disabled={!editable}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onMouseMove={(e) =>
            handleMouseMove(e, star)
          }
          onClick={(e) =>
            handleClick(e, star)
          }
          className={cn(
            "relative shrink-0 rounded-md",
            currentSize.button,
            editable &&
            "cursor-pointer transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            !editable && "cursor-default",
          )}
        >
          <div
            className={cn(
              "relative",
              currentSize.container,
            )}
          >
            {/* Empty star */}
            <Star
              className={cn(
                "absolute inset-0 text-amber-400",
                currentSize.star,
                {
                  "fill-amber-400":
                    !editable,
                },
              )}
            />

            {/* Filled portion */}
            {fillAmount > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: `${fillAmount * 100}%`,
                }}
              >
                <Star
                  className={cn(
                    "fill-amber-400 text-amber-400",
                    currentSize.star,
                  )}
                />
              </div>
            )}
          </div>
        </button>

        {editable && (hover === star || hover === star + 0.5) ? (
          <div
            className="
            pointer-events-none
            absolute left-1/2 top-full z-50
            -translate-x-1/2
            whitespace-nowrap
            rounded-md
            bg-black
            px-2.5 py-1.5
            text-xs font-medium text-white
        "
          >
            {LABELS[star]}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className="flex w-full items-center justify-center"
      onMouseLeave={() =>
        editable && setHover(null)
      }
    >
      <div
        className={cn(
          "flex max-w-full items-center",
          currentSize.gap,
        )}
      >
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>
    </div>
  );
}