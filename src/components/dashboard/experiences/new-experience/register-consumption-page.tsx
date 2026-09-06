"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  MapPin,
  Star,
  Compass,
  ThumbsDown,
  Check,
  Wallet,
  Search,
  Plus,
  Package,
  Wrench,
  LucideIcon,
  PackageOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldError, FieldLabel, FormSection } from "@/components/dashboard/experiences/new-experience/form-section";
import { SelectableChip } from "@/components/dashboard/experiences/new-experience/selectable-chip";
import { YesNoChoice } from "@/components/dashboard/experiences/new-experience/would-you-buy-again-section";
import { ItemHeroCard } from "@/components/dashboard/experiences/new-experience/item-hero-card";
import {
  brlDigitsToNumber,
  formatBRLFromDigits,
} from "@/lib/utils";
import { cn, getInitials } from "@/lib/utils";
import { RatingStars } from "@/components/ui/rating-starts";
import { DatePicker } from "@/components/ui/choicelog-date-picker";
import ConsumptionCreatedPage from "./consumption-created-page";
import { BasicItemModel, CategoryModel, CreateUpdateItemModel, ItemTypeEnum, ItemTypeModel } from "@/models/dashboard/items";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, CreateConsumptionModel, NegativeAspectModel } from "@/models/dashboard/consumption";
import { EmptyState } from "@/components/ui/empty-state";
import CreateUpdateItemModal from "../../items/create-item-modal";
import { toast } from "sonner";
import { PageHeader, PageSubtitle, PageTitle } from "@/components/ui/choicelog-pages-title";

interface Errors {
  item?: string;
  date?: string;
  rating?: string;
  reason?: string;
  influence?: string;
  price?: string;
  details?: string;
  address?: string;
  wouldBuyAgain?: string;
}

interface RegisterConsumptionProps {
  initialItems: BasicItemModel[];
  reasons: ConsumptionReasonModel[];
  aspects: NegativeAspectModel[];
  categories: CategoryModel[];
  itemTypes: ItemTypeModel[];
  consumptionInfluences: ConsumptionInfluenceModel[],
  postConsumption: (
    consumption: CreateConsumptionModel
  ) => void;
}
function getItemTypeId(typeName: ItemTypeEnum, itemTypes: ItemTypeModel[]): number {
  const itemTypeId: ItemTypeModel | undefined = itemTypes.find(x => x.name == typeName);
  if (itemTypeId == undefined)
    throw new Error();
  return itemTypeId.id;
}

export default function RegisterConsumptionPageClient({ initialItems, reasons, aspects, categories, itemTypes, postConsumption, consumptionInfluences }: RegisterConsumptionProps) {
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
  const [itemSearch, setItemSearch] = useState("");
  const [itemTypeFilter, setItemTypeFilter] = useState<"ALL" | ItemTypeEnum>("ALL");
  const [selectedItem, setSelectedItem] = useState<BasicItemModel | undefined>(undefined);
  const [newItemModalOpen, setNewItemModalOpen] = useState(false);
  const [items, setItems] = useState<BasicItemModel[]>(initialItems);

  interface FilterButtonProps {
    type: ItemTypeEnum; icon: LucideIcon
  }
  function ItemTypeFilterButton({ type, icon: Icon }: FilterButtonProps) {
    return (

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          setItemTypeFilter(
            itemTypeFilter === type ? "ALL" : type
          )
        }
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl bg-white text-blue-800 shadow-sm",
          itemTypeFilter === type
            ? "bg-blue-900 text-white hover:bg-blue-800"
            : "bg-white text-blue-900 hover:bg-blue-900"
        )}
      >
        <Icon className="size-4" />
      </Button>

    );
  }

  const selectedItemTypeId = selectedItem
    ? getItemTypeId(selectedItem.type, itemTypes)
    : undefined;

  const availableReasons = selectedItemTypeId
    ? reasons.filter((r) => r.typeId === selectedItemTypeId)
    : [];

  const availableNegativeAspects = selectedItemTypeId
    ? aspects.filter((a) => a.typeId === selectedItemTypeId)
    : [];
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
    const newItem = items.find((item) => item.id === id);
    setReasonId(null);
    setSelectedItem(newItem)
    setAspectIds([]);
    console.log(id)
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Errors = {};
    if (!selectedItem) errors.item = "Selecione o item consumido.";
    if (errors.date != undefined) errors.date = errors.date
    if (!date) errors.date = "Informe quando isso aconteceu.";
    if (!rating) errors.rating = "Avalie sua experiência.";
    if (!reasonId) errors.reason = "Selecione por que escolheu este item.";
    if (wouldBuyAgain === null) errors.wouldBuyAgain = "Informe se consumiria este item novamente.";
    if (!influenceId)
      errors.influence = "Selecione o que influenciou sua escolha.";
    if (brlDigitsToNumber(priceDigits) <= 0)
      errors.price = "Informe quanto você pagou.";
    if (details.length > 300) errors.details = "Mantenha em até 300 caracteres.";
    if (address.length > 255) errors.address = "O endereço informado é muito longo.";

    setErrors(errors);
    console.log(errors.wouldBuyAgain);
    if (Object.keys(errors).length > 0) return;

    const itemId = selectedItem?.id;
    if (!itemId) throw Error("Item should have been selected!");
    if (!date) throw Error("Date should have been entered!");
    if (!reasonId) throw Error("Reason should have been selected!");
    if (!influenceId) throw Error("Reason should have been selected!");

    if (wouldBuyAgain === null)
      throw Error("Would Buy Again should have been selected!");

    const payload: CreateConsumptionModel = {
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
    console.log(payload);
    try {
      postConsumption(payload)
      setSaved(true);
    }
    catch (error) {
      toast.warning("Erro ao tentar registrar consumo. Tente novamente mais tarde.")
    }
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
        <header className="flex flex-col items-center text-center mb-5">
          <PageHeader
            header="Diário de consumo"
            lineBefore
            lineAfter
          />

          <PageTitle title="Registrar Experiência" />

          <PageSubtitle
            subtitle="Uma breve reflexão sobre o que você consumiu, como se sentiu e por quê."
          />
        </header>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {selectedItem ? (
            <div className="mx-auto w-full max-w-md">

              <ItemHeroCard item={selectedItem} onChange={() => setSelectedItem(undefined)} />
            </div>
          ) : (
            <FormSection
              icon={Compass}
              title="O que você consumiu?"
              description="Escolha um de seus itens cadastrados para começar."
            >
              <div className="space-y-3">

                {/* Search + filters + add */}
                <div className="flex items-center gap-2">

                  {/* Search */}
                  <div className="relative min-w-0 flex-1">
                    <Search
                      className="
          absolute left-3 top-1/2
          size-4 -translate-y-1/2
          text-muted-foreground
        "
                    />

                    <Input
                      type="text"
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      placeholder="Buscar itens..."
                      className="
          h-10 w-full rounded-lg
          pl-9 pr-3
          text-base
        "
                    />
                  </div>

                  <ItemTypeFilterButton
                    type="PRODUCT"
                    icon={Package}
                  />


                  <ItemTypeFilterButton
                    type="SERVICE"
                    icon={Wrench}
                  />

                  {/* Add item */}
                  <Button
                    type="button"
                    onClick={() => setNewItemModalOpen(true)}
                    className="
        h-10 shrink-0
        gap-2
        rounded-lg
        bg-gradient-to-br from-blue-100 to-blue-200
        text-blue-800
        border-blue-200 
        px-4
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:bg-blue-700
        hover:shadow-md
      "
                  >
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">
                      Adicionar item
                    </span>
                  </Button>

                </div>
                {/* Scrollable items */}
                <div className="h-64 pt-2 pb-2 overflow-y-auto pr-1     
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-white
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredItems.map((i) => (
                      <button
                        key={i.id}
                        type="button"
                        onClick={() => selectItem(i.id)}
                        className="flex items-center gap-3
              rounded-xl
              border border cursor-pointer
              p-4 shadow-md
              
              text-left
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-accent/50"
                      >
                        {/* Item icon / initials */}
                        <span
                          className="
                grid size-11 shrink-0 place-items-center
                rounded-xl bg-blue-100 text-blue-600
                text-base font-semibold shadow-md
              "
                        >
                          {getInitials(i.friendlyName)}
                        </span>

                        {/* Item information */}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-black">
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

                    <EmptyState icon={PackageOpen} title="Nenhuma experiência encontrada" description="Tente outro filtro." />
                  )}
                </div>

                <FieldError>{errors.item}</FieldError>
              </div>
            </FormSection>
          )}

          <FormSection
            icon={Wallet}
            title="Informações da compra"
            description="Quanto a experiência custou e detalhes sobre ela."
          >
            <div className="grid max-w-3xl gap-6 sm:grid-cols-2">

              {/* PRICE */}
              <div>
                <FieldLabel htmlFor="price" required>
                  Preço
                </FieldLabel>

                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-base text-muted-foreground">
                    R$
                  </span>

                  <Input
                    id="price"
                    inputMode="numeric"
                    value={formatBRLFromDigits(priceDigits)}
                    onChange={(e) => {
                      setPriceDigits(e.target.value);
                      errors.price = undefined;
                    }}
                    placeholder="0,00"
                    className="h-11 bg-white pl-10"
                  />
                </div>

                <FieldError>{errors.price}</FieldError>
              </div>


              {/* DATE */}
              <div>
                <FieldLabel required>
                  Data do consumo
                </FieldLabel>

                <DatePicker
                  value={date}
                  onChange={setDate}
                  putCalendarIcon={true}
                  error={errors.date}
                  setError={(error: string | undefined) =>
                    setErrors((prev) => ({
                      ...prev,
                      date: error,
                    }))
                  }
                />
              </div>


              {/* ADDRESS */}
              <div>
                <FieldLabel htmlFor="address">
                  Endereço
                </FieldLabel>

                <div className="relative">
                  <MapPin
                    className="
                        absolute top-1/2 left-3
                        size-4
                        -translate-y-1/2
                        text-muted-foreground
                    "
                  />

                  <Input
                    id="address"
                    maxLength={255}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Onde foi?"
                    className="h-11 bg-white pl-9"
                  />
                </div>

                <FieldError>{errors.address}</FieldError>
              </div>


              {/* DETAILS */}
              <div>
                <FieldLabel htmlFor="details">
                  Detalhes
                </FieldLabel>
                <Textarea
                  id="details"
                  rows={6}
                  maxLength={300}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Conte mais sobre sua experiência."
                  className="
        h-20
        resize-none
        overflow-y-auto
        bg-white
    "
                />

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <FieldError>{errors.details}</FieldError>

                  <span className="ml-auto">
                    {details.length}/300
                  </span>
                </div>
              </div>

            </div>
          </FormSection>

          <FormSection
            icon={Compass}
            title="Sua decisão"
            description="O que levou você a esta escolha?"
          >
            <div>
              <FieldLabel required>Qual foi o propósito deste consumo?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {!selectedItem ? (
                  <p className="mt-2 text-base text-muted-foreground">
                    Selecione o item consumido para ver os motivos disponíveis.
                  </p>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {availableReasons.map((r) => (
                      <SelectableChip
                        key={r.id}
                        selected={reasonId === r.id}
                        invalid={Boolean(errors.reason)}
                        onClick={() => {
                          setReasonId(r.id);
                          errors.reason = undefined;
                        }}
                      >
                        {r.friendlyName}
                      </SelectableChip>
                    ))}
                  </div>
                )}
              </div>
              <FieldError>{errors.reason}</FieldError>
            </div>

            <div>
              <FieldLabel required>O que mais influenciou sua escolha?</FieldLabel>
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
            title="Aspectos negativos"
            description="Algo que lhe incomodou? Selecione quantos pontos negativos quiser, incluse, nenhum."
          >
            <div className="flex flex-wrap gap-2">
              {!selectedItem ? (
                <p className="mt-2 text-base text-muted-foreground">
                  Selecione o item consumido para ver os aspectos negativos disponíveis.
                </p>
              ) :
                availableNegativeAspects.map((a) => {
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
                  )
                })}
            </div>
          </FormSection>
          <FormSection
            icon={Star}
            title="Sua experiência"
            description="Qual é a sua avaliação final?"
          >
            <div className="flex max-w-xl flex-col gap-6">

              {/* FINAL RATING */}
              <div className="flex flex-col items-center justify-center">
                <FieldLabel required>
                  Avaliação final
                </FieldLabel>

                <RatingStars
                  value={rating}
                  onChange={(x) => {
                    setRating(x);
                    errors.rating = undefined;
                  }}
                  editable={true}
                />

                <FieldError>
                  {errors.rating}
                </FieldError>
              </div>

              {/* WOULD BUY AGAIN */}
              <div className="flex flex-col items-center justify-center">
                <FieldLabel required>
                  Você consumiria este item de novo?
                </FieldLabel>

                <YesNoChoice
                  value={wouldBuyAgain}
                  onChange={(x) => { setWouldBuyAgain(x); errors.wouldBuyAgain = undefined; }}
                />
                <FieldError>
                  {errors.wouldBuyAgain}
                </FieldError>
              </div>

            </div>
          </FormSection>
          <div className="rounded-2xl bg-transparent p-6">
            <div className="flex justify-center gap-3">

              {/* Cancel */}
              <Button
                asChild
                type="button"
                variant="ghost"
                className="
        h-11
        sm:w-32
        border border-blue-200
        bg-blue-50
        text-blue-700
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-blue-300
        hover:bg-blue-100
        hover:text-blue-800
      "
              >
                <Link href="/dashboard/experiences">
                  Cancelar
                </Link>
              </Button>

              {/* Save */}
              <Button
                type="submit"
                className="
        h-11
        sm:w-48
        border border-blue-800
        bg-blue-800
        text-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-blue-700
        hover:bg-blue-700
        hover:shadow-md
        hover:shadow-blue-200/50
      "
              >
                Salvar experiência
              </Button>

            </div>
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