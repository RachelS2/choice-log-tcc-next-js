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
  Search,
  Plus,
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
import { SelectableChip } from "@/components/dashboard/experiences/new-experience/selectable-chip";
import { YesNoChoice } from "@/components/dashboard/experiences/new-experience/would-you-buy-again-section";
import { ItemHeroCard } from "@/components/dashboard/experiences/new-experience/what-did-you-consume-section";
import {
  brlDigitsToNumber,
  consumptionInfluences,
  formatBRLFromDigits,
  negativeAspectsForType,
  reasonsForType,
} from "@/lib/consumption-data";
import { cn, getInitials } from "@/lib/utils";
import { RatingStars } from "@/components/ui/rating-starts";
import DatePicker from "@/components/ui/date-picker";
import ConsumptionCreatedPage from "./consumption-created-page";
import { BasicItemModel, CategoryModel, CreateUpdateItemModel, ItemTypeEnum } from "@/models/dashboard/items";
import { getItemsController } from "@/lib/controller/item-controller";
import { ConsumptionReasonModel, NegativeAspectModel } from "@/models/dashboard/consumption";
import EmptyDataState from "@/components/ui/empty-state";
import CreateUpdateItemModal from "../../items/create-item-modal";

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

interface RegisterConsumptionProps {
  initialItems: BasicItemModel[];
  reasons: ConsumptionReasonModel[];
  aspects: NegativeAspectModel[];
  categories: CategoryModel[];
}
export default function RegisterConsumptionPageClient({ initialItems, reasons, aspects, categories }: RegisterConsumptionProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [itemId, setItemId] = useState<string | null>(null);
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
  const [itemSearch, setItemSearch] = useState("");
  const [itemTypeFilter, setItemTypeFilter] = useState<"ALL" | ItemTypeEnum>("ALL");
  const [selectedItem, setSelectedItem] = useState<BasicItemModel | undefined>(undefined);
  const [newItemModalOpen, setNewItemModalOpen] = useState(false);
  const [items, setItems] = useState<BasicItemModel[]>(initialItems);

  const filteredItems = items.filter((item) => {
    const search = itemSearch.toLowerCase().trim();

    const matchesSearch =
      !search ||
      item.friendlyName.toLowerCase().includes(search) ||
      item.brand?.toLowerCase().includes(search);

    const matchesType =
      itemTypeFilter === "ALL" ||
      item.type === itemTypeFilter;

    return matchesSearch && matchesType;
  });
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
    if (!selectedItem) next.item = "Please choose the item you consumed.";
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

  if (saved && selectedItem) {
    return (

      <ConsumptionCreatedPage itemName={selectedItem.friendlyName} onButtonClick={() => {
        setSaved(false);
        setRating(0);
        setDetails("");
        setAddress("");
        setReasonId(null);
        setInfluenceId(null);
        setPriceDigits("");
        setWouldBuyAgain(null);
        setAspectIds([]);
      }} />
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
          {selectedItem ? (
            <ItemHeroCard item={selectedItem} onChange={() => setItemId(null)} />
          ) : (
            <FormSection
              icon={Compass}
              title="What did you consume?"
              description="Pick one of your registered items to start."
              headerAction={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewItemModalOpen(true)}
                  className="gap-2 rounded-lg shadow-md bg-blue-50 hover:text-white border-blue-50 h-11 text-blue-600 hover:bg-blue-500"
                >
                  <Plus className="size-4" />
                  Add item
                </Button>
              }
            >
              <div className="space-y-3">

                {/* Search + Type filter */}
                <div className="flex flex-col gap-2 sm:flex-row">

                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="text"
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      placeholder="Search items..."
                      className="
            h-10 w-full rounded-lg
            pl-9 pr-3
            text-sm
            outline-none
            transition-colors
            placeholder:text-muted-foreground

          "
                    />
                  </div>

                  {/* Type filter */}
                  <div className="flex h-10 rounded-lg items-center  gap-1 p-1">
                    {[
                      { value: "ALL", label: "All" },
                      { value: "PRODUCT", label: "Products" },
                      { value: "SERVICE", label: "Services" },
                    ].map((option) => (


                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setItemTypeFilter(
                            option.value as "ALL" | "PRODUCT" | "SERVICE"
                          )
                        }
                        className={cn(
                          "rounded-md h-10 hover:-translate-y-0.5  px-3 text-xs shadow-md font-medium hover:bg-blue-200 hover:font-semibold transition-colors",
                          itemTypeFilter === option.value
                            ? "bg-blue-600 hover:bg-blue-700 border-blue-600 text-foreground "
                            : "bg-blue-50 border-blue-100  text-blue-600 hover:text-blue-600"
                        )}
                      >
                        {option.label}
                      </Button>
                    ))}

                  </div>
                </div>

                {/* Scrollable items */}
                <div className="max-h-64 overflow-y-auto pr-1">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredItems.map((i) => (
                      <button
                        key={i.id}
                        type="button"
                        onClick={() => selectItem(i.id)}
                        className="
              flex items-center gap-3
              rounded-xl
              border border-border
              bg-background
              p-4
              text-left
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-primary/50
              hover:bg-accent/50
            "
                      >
                        {/* Item icon / initials */}
                        <span
                          className="
                grid size-11 shrink-0 place-items-center
                rounded-lg
                bg-primary/10
                text-sm font-semibold
                text-primary
              "
                        >
                          {getInitials(i.friendlyName)}
                        </span>

                        {/* Item information */}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {i.friendlyName}
                          </span>

                          <span className="block truncate text-xs text-muted-foreground">
                            {i.brand} · {i.categoryName}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Empty state */}
                  {filteredItems.length === 0 && (

                    <EmptyDataState className="w-full min-h-[50px] py-8 border-none" mainTitle="No items found" description="Try another search or filter." />
                  )}
                </div>

                <FieldError>{errors.item}</FieldError>
              </div>
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
      <CreateUpdateItemModal
        open={newItemModalOpen}
        mode="create"
        onOpenChange={setNewItemModalOpen}
        categories={categories}
        onSuccess={async (newItem: CreateUpdateItemModel) => {
          setNewItemModalOpen(false);
          setItems((currentItems) => [
            ...currentItems,
            newItem,
          ]);
          selectItem(newItem.id);

        }}
      />
    </div>
  );
}