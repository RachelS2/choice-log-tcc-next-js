import { useState } from "react";
import {
  CalendarDays,
  CircleHelp,
  Clock,
  LucideIcon, Save,
  MapPin,
  Pencil,
  RefreshCw,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet";
import { cn, formatDate, formatDateTime, getInfluenceName, getNegativeAspectsNames, getReasonName } from "@/lib/utils";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, EditConsumptionModel, NegativeAspectModel, ReadConsumptionModel } from "@/models/dashboard/consumption";
import { ItemHero } from "@/components/ui/choicelog-item-hero";
import { RatingStars } from "@/components/ui/rating-starts";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import Modal from "@/components/ui/choicelog-modal";
import { Input } from "@/components/ui/input";
import { ConsumptionInfluenceFilter, ConsumptionReasonFilter } from "@/components/ui/choicelog-filter-options";
import { DatePicker } from "@/components/ui/choicelog-date-picker";
import { Textarea } from "@/components/ui/textarea";
import { SelectableChip } from "@/components/ui/choicelog-chips";
import { toast } from "sonner";
import { updateConsumptionController, deleteConsumptionController } from "@/lib/controller/consumption-controller";

function Row({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[minmax(0,1fr)_minmax(220px,280px)]
        items-center
        gap-6
        border-b
        border-border
        px-4
        py-3.5
        last:border-b-0
      "
    >
      <span
        className="
          inline-flex
          min-w-0
          items-center
          gap-2
          text-md
          text-blue-900
        "
      >
        {Icon && (
          <Icon className="size-4 shrink-0 text-blue-700" />
        )}

        <span className="break-words">
          {label}
        </span>
      </span>

      <div
        className="
          flex
          min-w-0
          w-full
          items-center
          justify-end
          text-right
          text-md
          font-medium
          text-blue-950/90
        "
      >
        {children}
      </div>
    </div>
  );
}


export function ConsumptionDetails({
  data,
  onOpenChange,
  onDelete,
  consumptionReasons,
  consumptionInfluences,
  negativeAspects,
  updateConsumption
}: {
  data: ReadConsumptionModel | null;
  onOpenChange: (open: boolean) => void;
  onDelete: (c: EditConsumptionModel) => void;
  consumptionReasons: ConsumptionReasonModel[];
  consumptionInfluences: ConsumptionInfluenceModel[];
  negativeAspects: NegativeAspectModel[]
  updateConsumption: (updatedConsumption: ReadConsumptionModel) => void,

}) {

  if (!data) return null;

  const [onDeleteConsumptionModal, setDeleteConsumptionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditConsumptionModel>({
    consumptionId: data.id,
    price: data.price,
    rating: data.rating,
    date: data.date,
    wouldBuyAgain: data.wouldBuyAgain,
    reasonId: data.reason.id,
    influenceId: data.influence.id,
    address: data.address,
    details: data.details,
    negativeAspectIds: data.negativeAspects.map(
      (aspect) => aspect.id
    ),
  });
  const [dateErrors, setDateErrors] = useState<string | undefined>(undefined);

  const negativeAspectsToRender = isEditing
    ? negativeAspects.filter((aspect) => aspect.typeId == data.item.typeId)
    : getNegativeAspectsNames(draft.negativeAspectIds, negativeAspects);

  function WouldBuyAgainButton() {
    let Icon: LucideIcon = ThumbsDown;
    let text = "Não";
    let textColor = "text-red-600";
    let hover = "hover:bg-red-200"
    if (draft.wouldBuyAgain) {
      Icon = ThumbsUp;
      text = "Sim";
      textColor = "text-emerald-600";
      hover = "hover:bg-emerald-200";
    }
    return <Button
      type="button"
      onClick={(e) => {
        if (draft) {
          setDraft({
            ...draft,
            wouldBuyAgain: !(draft.wouldBuyAgain),
          });
        }
      }}
      disabled={!isEditing}
      aria-disabled={!isEditing}
      className={cn(
        "inline-flex items-center h-11 w-32 gap-1.5",
        textColor,
        isEditing
          ? "cursor-pointer shadow-sm bg-white justify-center"
          : "cursor-default shadow-none bg-blue-50 justify-end hover:bg-blue-50",
        isEditing && hover
      )}
    >

      <Icon className="size-3.5" />
      {text}
    </Button>
  }

  async function onSaveEditions() {
    if (!data || !draft) return;
    setLoading(true);
    try {
      const u = await updateConsumptionController(draft);
      updateConsumption(u)
      setDraft({
        consumptionId: u.id,
        price: u.price,
        rating: u.rating,
        date: u.date,
        wouldBuyAgain: u.wouldBuyAgain,
        reasonId: u.reason.id,
        influenceId: u.influence.id,
        address: u.address,
        details: u.details,
        negativeAspectIds: u.negativeAspects.map(
          (aspect) => aspect.id
        ),
      });
      setIsEditing(false);


      // toast.success("Consumo atualizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao tentar atualizar a experiência.");
    }
    setLoading(false);
  }

  async function onDeleteConsumptionBtnClick(): Promise<void> {
    try {
      onDelete(draft);
      deleteConsumptionController(draft)
      toast.warning("Experiência excluída com sucesso.")
    }
    catch (error) {
      toast.error("Erro ao tentar excluir experiência.")
    }

    setDeleteConsumptionModal(false);
  }
  return (
    <>
      <Sheet open={!!data} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="
    w-full
    p-0
    sm:max-w-[680px]
    lg:max-w-[760px]
    flex
    flex-col
    overflow-hidden
    bg-gradient-to-br
    from-blue-700
    via-blue-600
    to-blue-500 
  "
        >

          <div className="min-h-0 flex-1 overflow-y-auto
          bg-gradient-to-br from-blue-900 via-blue-800 to-slate-700">

            <SheetHeader>
              <SheetTitle>

              </SheetTitle>
              <SheetDescription>

              </SheetDescription>
            </SheetHeader>
            {/* HERO */}
            <div className="text-white space-y-6 px-6 pb-8 pt-2">

              <PageHeader
                header="Experiência"
                textClassName="text-base text-offWhite"
                lineAfter
                lineClassName="bg-offWhite"
              />

              <div className=" p-3 justify-center items-center bg-blue-50 shadow-md rounded-2xl ">
                <ItemHero item={data.item} />
              </div>
              <div className="p-1 border-b border-blue-900" />
            </div>

            {/* CONTENT */}
            <div className="space-y-6 px-6">

              {/* MAIN INFO */}
              <section
                className="
              overflow-hidden
              rounded-2xl
              border border-border
              bg-blue-50
              shadow-md
            "
              >
                <Row
                  label="Registrado em"
                  icon={Clock}
                >
                  {formatDateTime(data.createdAt)}
                </Row>

                <Row
                  label="Avaliação"
                  icon={Star}
                >
                  <div className="h-9 w-32 text-right grid justify-end">
                    <RatingStars
                      size="sm"
                      value={draft.rating}
                      editable={isEditing}
                      onChange={
                        isEditing
                          ? (rating) =>
                            setDraft({
                              ...draft,
                              rating,
                            })
                          : undefined
                      }
                    />
                  </div>
                </Row>

                <Row
                  label="Preço"
                  icon={Wallet}
                >
                  {isEditing ? (
                    <Input
                      type="number"
                      value={draft.price}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          price: Number(e.target.value),
                        })
                      }
                      className="h-11 w-32 bg-white text-right"
                    />
                  ) : (
                    `R$ ${draft.price.toFixed(2)}`
                  )}
                </Row>

                <Row
                  label="Data do consumo"
                  icon={CalendarDays}
                >
                  {isEditing ?
                    (
                      <div className="h-9 w-32 text-right grid justify-end">
                        <DatePicker
                          value={draft.date}
                          onChange={(value) =>
                            setDraft({
                              ...draft,
                              date: value,
                            })}
                          putCalendarIcon={false}
                          error={dateErrors}
                          setError={(error: string | undefined) =>
                            setDateErrors(error)
                          }
                        />
                      </div>
                    ) :
                    (
                      formatDate(draft.date)
                    )}
                </Row>

                <Row
                  label="Compraria novamente"
                  icon={RefreshCw}
                >
                  <div className="grid justify-end">
                    <WouldBuyAgainButton />

                  </div>
                </Row>

                <Row
                  label="Motivo do consumo"
                  icon={CircleHelp}
                >
                  {isEditing ? (
                    <div className="h-9 shrink-0 w-32">
                      <ConsumptionReasonFilter
                        addLabel={false}
                        onChange={(value) =>
                          setDraft({
                            ...draft,
                            reasonId: Number(value),
                          })}
                        consumptionReasons={consumptionReasons}
                        value={String(draft.reasonId)} />
                    </div>) :
                    (getReasonName(draft.reasonId, consumptionReasons))}
                </Row>

                <Row
                  label="Influência"
                  icon={Sparkles}
                >
                  {isEditing ? (
                    <div className="h-9 shrink-0 w-32">
                      <ConsumptionInfluenceFilter
                        addLabel={false}
                        onChange={(value) => {
                          setDraft({
                            ...draft,
                            influenceId: Number(value),
                          })

                        }

                        }
                        influences={consumptionInfluences}
                        value={String(draft.influenceId)}
                      />
                    </div>
                  ) : (

                    getInfluenceName(draft.influenceId, consumptionInfluences)

                  )}
                </Row>

                {draft.address && (
                  <Row
                    label="Endereço"
                    icon={MapPin}
                  > {isEditing ? (
                    <Input
                      id="address"
                      maxLength={255}
                      value={draft.address ?? undefined}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          address: e.target.value,
                        })}
                      placeholder="Onde foi?"
                      className="h-11 w-32 bg-white"
                    />) : draft.address}
                  </Row>
                )}
              </section>
              <div className="border-b border-blue-900" />

              {/* NEGATIVE ASPECTS */}
              {(
                <section>

                  <PageHeader
                    header="Aspectos Negativos"
                    textClassName="text-base  text-white"
                    lineAfter
                    lineClassName="bg-white"
                  />

                  <div className="flex flex-wrap gap-2 pt-3">
                    {negativeAspectsToRender.map((aspect) => {
                      const selected = isEditing
                        ? draft?.negativeAspectIds.includes(aspect.id) ?? false
                        : true;

                      return (
                        <SelectableChip
                          key={aspect.id}
                          selected={selected}
                          onClick={() => {
                            if (!isEditing || !draft) return;

                            setDraft({
                              ...draft,
                              negativeAspectIds: selected
                                ? draft.negativeAspectIds.filter(
                                  (id) => id !== aspect.id
                                )
                                : [
                                  ...draft.negativeAspectIds,
                                  aspect.id,
                                ],
                            });
                          }}
                          selectedClassName={cn(
                            "rounded-full border border-red-300 bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700",
                            isEditing
                              ? "cursor-pointer hover:bg-red-200"
                              : "cursor-default"
                          )}
                          unselectedClassName="
          rounded-full
          border border-white/40
          bg-white/10
          px-3 py-1.5
          text-xs
          font-medium
          text-white 
          hover:bg-white/20
          hover:text-white
        "
                        >
                          {aspect.friendlyName}
                        </SelectableChip>
                      );
                    })}
                  </div>
                </section>
              )}
              <div className="border-b border-blue-900" />
              {/* OBSERVATIONS */}
              {(
                <section>
                  <PageHeader
                    header="Observações"
                    textClassName="text-base  text-white"
                    lineAfter
                    lineClassName="bg-white"
                  />
                  {isEditing ?
                    (<Textarea
                      id="details"
                      rows={6}

                      maxLength={300}
                      value={draft.details ?? undefined}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          details: e.target.value,
                        })}
                      placeholder="Conte mais sobre sua experiência."
                      className="
        h-20
        resize-none
        overflow-y-auto
        bg-white
    "
                    />) :
                    <p
                      className="
                  rounded-2xl overflow-y-auto 
                  border border-border
                  bg-muted/40
                  p-4
                  mt-3
                  text-sm
                  leading-relaxed
                  text-offWhite 
                "
                    >
                      {draft.details}
                    </p>
                  }

                </section>
              )}

              {/* ACTIONS */}
              <div className="
            flex
            flex-col
            gap-2 pb-4 
            sm:flex-row  
          ">

                <Button
                  type="button"
                  disabled={loading}
                  onClick={isEditing ? onSaveEditions : () => setIsEditing(true)}
                  className="h-11 flex-1 px-3"
                >
                  {isEditing ? (
                    <>
                      <Save className="size-4" />
                      Salvar alterações
                    </>
                  ) : (
                    <>
                      <Pencil className="size-4" />
                      Editar experiência
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="
                h-11
                flex-1
                border border-blue-900
                bg-blue-100 text-foreground
                hover:bg-red-400
                hover:text-red-900
              "
                  onClick={() => setDeleteConsumptionModal(true)}
                >
                  <Trash2 className="size-4" />
                  Excluir experiência
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Modal buttonText="Excluir" dialogTitle="Excluir este consumo?" dialogDescription="Esta ação não pode ser desfeita. O registro será removido permanentemente do seu histórico."
        open={onDeleteConsumptionModal} onOpenChange={setDeleteConsumptionModal} onConfirm={onDeleteConsumptionBtnClick} />

    </>
  );
}
