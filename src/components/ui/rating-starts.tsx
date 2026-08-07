import { Star, StarHalf } from "lucide-react";

type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({
  rating,
}: RatingStarsProps) {
  const fullStars : number = Math.floor(rating);
  const hasHalfStar : boolean = rating % 1 >= 0.5;
  const emptyStars : number =
    5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map(
        (_, index) => (
          <Star
            key={`full-${index}`}
            className="h-4 w-4 fill-amber-400 text-amber-400"
          />
        )
      )}

      {/* Half star */}
      {hasHalfStar && (
        <StarHalf className="h-4 w-4 fill-amber-400 text-amber-400" />
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map(
        (_, index) => (
          <Star
            key={`empty-${index}`}
            className="h-4 w-4 text-gray-300"
          />
        )
      )}
    </div>
  );
}