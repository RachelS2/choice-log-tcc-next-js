import { useState } from 'react';
import { Star, CalendarIcon } from 'lucide-react';
import { format, setDate } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ExperienceDetailsProps {
  rating: number;
  onRatingChange: (value: number) => void;
  wouldBuyAgain: boolean;
  onWouldBuyAgainChange: (value: boolean) => void;
  price: string;
  onPriceChange: (value: string) => void;
  date: Date;
  onDateChange: (value: Date) => void;
}

export default function ExperienceDetails({
  rating,
  onRatingChange,
  wouldBuyAgain,
  onWouldBuyAgainChange,
  price,
  onPriceChange,
  date,
  onDateChange,
}: ExperienceDetailsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Experience details</CardTitle>
          <CardDescription>Rate this purchase and record the key facts.</CardDescription>
        </CardHeader>
        <CardContent>

          <div className="space-y-6">
            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const filled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => onRatingChange(star)}
                        className="p-1 transition-transform hover:scale-110"
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={cn(
                            'h-7 w-7 transition-colors',
                            filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {rating > 0 ? `${rating} / 5` : 'Tap to rate'}
                </span>
              </div>
            </div>

            {/* Would buy again */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="space-y-0.5">
                <Label htmlFor="buy-again" className="text-sm font-medium">
                  Would buy again?
                </Label>
                <p className="text-xs text-gray-500">
                  Would you purchase this product again in the future?
                </p>
              </div>
              <Switch
                id="buy-again"
                checked={wouldBuyAgain}
                onCheckedChange={onWouldBuyAgainChange}
              />
            </div>

            {/* Price + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price paid</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => onPriceChange(e.target.value)}
                    className="pl-7"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Consumption date</Label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal bg-white',
                        !date && 'text-gray-500'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        if (d) {
                          onDateChange(d);
                          setDatePickerOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}