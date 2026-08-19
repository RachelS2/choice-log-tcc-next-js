"use client";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Star,
  Compass,
  ThumbsDown,
  Check,
  CircleCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldError, FieldLabel, FormSection } from "@/components/dashboard/experiences/new-experience/form-section";
import { SelectableChip } from "@/components/dashboard/experiences/new-experience/SelectableChip";
import { YesNoChoice } from "@/components/dashboard/experiences/new-experience/would-you-buy-again-choice";
import { ItemHeroCard } from "@/components/dashboard/experiences/new-experience/what-did-you-consume-section";
import {
  brlDigitsToNumber,
  consumptionInfluences,
  formatBRLFromDigits,
  itemInitials,
  items,
  negativeAspectsForType,
  reasonsForType,
} from "@/lib/consumption-data";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/ui/rating-starts";
import DatePicker from "@/components/ui/date-picker";

interface Errors {
  item?: string;
  date?: string;
  rating?: string;
  reason?: string;
  influence?: string;
  price?: string;
  details?: string;
  address?: string;
}

export default function RegisterConsumptionPage() {
  const [itemId, setItemId] = useState<string | null>(items[0]?.id ?? null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState(0);
  const [details, setDetails] = useState("");
  const [reasonId, setReasonId] = useState<number | null>(null);
  const [influenceId, setInfluenceId] = useState<number | null>(null);
  const [priceDigits, setPriceDigits] = useState("");
  const [wouldBuyAgain, setWouldBuyAgain] = useState<boolean | null>(null);
  const [aspectIds, setAspectIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  const item = useMemo(() => items.find((i) => i.id === itemId) ?? null, [itemId]);
  const reasons = item ? reasonsForType(item.typeId) : [];
  const aspects = item ? negativeAspectsForType(item.typeId) : [];

  const toggleAspect = (id: number) =>
    setAspectIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const selectItem = (id: string) => {
    setItemId(id);
    setReasonId(null);
    setAspectIds([]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!item) next.item = "Please choose the item you consumed.";
    if (!date) next.date = "Please tell us when this happened.";
    if (!rating) next.rating = "Please rate your experience.";
    if (!reasonId) next.reason = "Please select why you chose this item.";
    if (!influenceId)
      next.influence = "Please select what influenced your choice.";
    if (brlDigitsToNumber(priceDigits) <= 0)
      next.price = "Please enter how much you paid.";
    if (details.length > 300) next.details = "Keep it under 300 characters.";
    if (address.length > 255) next.address = "This address is too long.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Payload shaped for the Consumption model (no backend wired yet).
    const payload = {
      itemId,
      date,
      address: address.trim() || null,
      rating,
      details: details.trim() || null,
      reasonId,
      influenceId,
      price: brlDigitsToNumber(priceDigits),
      wouldBuyAgain,
      negativeAspects: aspectIds,
    };
    void payload;
    setSaved(true);
  };

  if (saved && item) {
    return (
      <div
        className="min-h-screen px-4 py-16"
        style={{ background: "var(--gradient-subtle)" }}
      >
        <div
          className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center duration-500 animate-in fade-in slide-in-from-bottom-2"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CircleCheck className="size-7" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Consumption saved
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your experience with {item.name} is now part of your ChoiceLog
            history.
          </p>
          <div className="mt-6 space-y-3">
            <Button
              className="h-11 w-full"
              onClick={() => {
                setSaved(false);
                setRating(0);
                setDetails("");
                setAddress("");
                setReasonId(null);
                setInfluenceId(null);
                setPriceDigits("");
                setWouldBuyAgain(null);
                setAspectIds([]);
              }}
            >
              Register another
            </Button>
            <Button asChild variant="ghost" className="h-11 w-full">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-10 sm:py-14"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex items-center flex-col text-center">

          <h1
            className="mt-1 text-3xl font-bold tracking-tight text-blue-600"
            style={{
              textShadow: "0 3px 0 #dbeafe, 0 6px 12px rgba(37, 99, 235, 0.2)",
            }}
          >
            Register consumption
          </h1>
          <p className="mt-2 max-w-xl text-md leading-relaxed text-muted-foreground">
            A short reflection on what you consumed, how it felt and why you
            chose it.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {item ? (
            <ItemHeroCard item={item} onChange={() => setItemId(null)} />
          ) : (
            <FormSection
              icon={Compass}
              title="What did you consume?"
              description="Pick one of your registered items to start."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => selectItem(i.id)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/50"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                      {itemInitials(i.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {i.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {i.brand} · {i.category}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <FieldError>{errors.item}</FieldError>
            </FormSection>
          )}

          <FormSection
            icon={CalendarIcon}
            title="When & Where"
            description="When did this experience happen?"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel required>Date</FieldLabel>
                <DatePicker value={date} onChange={setDate} putCalendarIcon={true} />
                <FieldError>{errors.date}</FieldError>
              </div>

              <div>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="address"
                    maxLength={255}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Where did you consume it?"
                    className="h-11 pl-9"
                  />
                </div>
                <FieldError>{errors.address}</FieldError>
              </div>
            </div>
          </FormSection>

          <FormSection

            icon={Wallet}
            title="Purchase information"
            description="How much did the experience cost — and details about it."
          >

            <div className="grid gap-6 sm:grid-cols-2">
              <div>


                <FieldLabel htmlFor="price" required>
                  Price
                </FieldLabel>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    R$
                  </span>
                  <Input
                    id="price"
                    inputMode="numeric"
                    value={formatBRLFromDigits(priceDigits)}
                    onChange={(e) => { setPriceDigits(e.target.value); errors.price = undefined; }}
                    placeholder="0,00"
                    className="h-11 pl-10"
                  />
                </div>
                <FieldError>{errors.price}</FieldError>
              </div>
              <div>
                <FieldLabel htmlFor="details">Details</FieldLabel>
                <Textarea
                  id="details"
                  rows={6}
                  maxLength={300}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us a little about your experience..."
                  className="resize-none"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <FieldError>{errors.details}</FieldError>
                  <span className="ml-auto">{details.length}/300</span>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection
            icon={Compass}
            title="Your decision"
            description="What led you to this choice?"
          >
            <div>
              <FieldLabel required>Why did you choose it?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {reasons.map((r) => (
                  <SelectableChip
                    key={r.id}
                    selected={reasonId === r.id}
                    invalid={Boolean(errors.reason)}
                    onClick={() => { setReasonId(r.id); errors.reason = undefined; }}
                  >
                    {r.friendlyName}
                  </SelectableChip>
                ))}
              </div>
              <FieldError>{errors.reason}</FieldError>
            </div>

            <div>
              <FieldLabel required>What influenced your choice?</FieldLabel>
              <div className="flex flex-wrap gap-2 text-blue-600">
                {consumptionInfluences.map((inf) => (
                  <SelectableChip
                    key={inf.id}
                    selected={influenceId === inf.id}
                    invalid={Boolean(errors.influence)}
                    onClick={() => { setInfluenceId(inf.id); errors.influence = undefined; }}
                  >
                    {inf.friendlyName}
                  </SelectableChip>
                ))}
              </div>
              <FieldError>{errors.influence}</FieldError>
            </div>
          </FormSection>


          <FormSection
            icon={ThumbsDown}
            title="Negative aspects"
            description="Anything that bothered you? Select as many as you want — or none."
          >
            <div className="flex flex-wrap gap-2">
              {aspects.map((a) => {
                const selected = aspectIds.includes(a.id);
                return (
                  <SelectableChip
                    key={a.id}
                    selected={selected}
                    onClick={() => toggleAspect(a.id)}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {selected ? <Check className="size-3.5" /> : null}
                      {a.friendlyName}
                    </span>
                  </SelectableChip>
                );
              })}
            </div>
          </FormSection>

          <FormSection
            icon={Star}
            title="Your experience"
            description="What is your final review?"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col items-center justify-center">
                <FieldLabel required>Final Rating</FieldLabel>

                <RatingStars
                  value={rating}
                  onChange={(x) => {
                    setRating(x);
                    errors.rating = undefined;
                  }}
                  editable={true}
                />

                <FieldError>{errors.rating}</FieldError>
              </div>

              <div className="flex flex-col items-center justify-center">
                <FieldLabel>Would you consume it again?</FieldLabel>

                <YesNoChoice
                  value={wouldBuyAgain}
                  onChange={setWouldBuyAgain}
                />
              </div>
            </div>
          </FormSection>

          <div className="sticky bottom-0 -mx-4 flex flex-col gap-3 border-t border-border bg-background/85 px-4 py-4 backdrop-blur sm:flex-row sm:justify-end sm:rounded-2xl sm:border sm:px-6">
            <Button asChild type="button" variant="ghost" className="h-11 sm:w-32">
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit" className="h-11 sm:w-48">
              Save consumption
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}