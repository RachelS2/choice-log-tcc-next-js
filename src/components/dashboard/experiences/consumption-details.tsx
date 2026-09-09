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
import { formatDate, formatDateTime } from "@/lib/utils";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, ReadConsumptionModel } from "@/models/dashboard/consumption";
import { ItemHero } from "@/components/ui/choicelog-item-hero";
import { RatingStars } from "@/components/ui/rating-starts";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import Modal from "@/components/ui/choicelog-modal";
import { Input } from "@/components/ui/input";
import { ConsumptionInfluenceFilter, ConsumptionReasonFilter } from "@/components/ui/choicelog-filter-options";

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
        flex
        items-center
        justify-between
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
          items-center
          gap-2
          bg-blue-50
          px-3 py-1.5
          text-md
          text-blue-900
        "
      >
        {Icon && (
          <Icon className="size-4 shrink-0 text-blue-700" />
        )}

        {label}
      </span>

      <div
        className="
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

interface EditConsumptionModel {
  price: number;
  rating: number;
  date: Date;
  wouldBuyAgain: boolean;
  reasonId: number;
  influenceId: number;
  address: string;
  details: string | null;
  negativeAspectIds: number[];
  consumptionId: string;
}

export function ConsumptionDetails({
  data,
  onOpenChange,
  onDelete,
  consumptionReasons,
  consumptionInfluences
}: {
  data: ReadConsumptionModel | null;
  onOpenChange: (open: boolean) => void;
  onDelete: (c: ReadConsumptionModel) => void;
  consumptionReasons: ConsumptionReasonModel[];
  consumptionInfluences: ConsumptionInfluenceModel[];
}) {

  if (!data) return null;
  
  const [confirming, setConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditConsumptionModel | null>(null);
  const [influenceId, setInfluenceId] = useState<number>(data.influence.id);
  const [reasonId, setReasonId] = useState<number>(data.reason.id);
  function startEditing() {
    console.log("clicou em editar!")
    if (!data) return;
    console.log("tem dados");
    console.log("reasonId: " + reasonId);
    console.log("influenceId: " + influenceId);
    setDraft({
      consumptionId: data.id,
      price: data.price,
      rating: data.rating,
      date: data.date,
      wouldBuyAgain: data.wouldBuyAgain,
      reasonId: reasonId,
      influenceId: influenceId,
      address: data.address ?? "",
      details: data.details ?? "",
      negativeAspectIds: data.negativeAspects.map(
        (aspect) => aspect.id
      ),
    })

    setIsEditing(true);

  }

  function onSaveEditions() {
    if (!data || !draft) return;
    setIsEditing(false);
    console.log("salvando consumo cujo ID é: " + draft.consumptionId);
    setDraft(null)
  }
  async function onDeleteConsumptionBtnClick(): Promise<void> {
    if (data) onDelete(data);
    setConfirming(false);
  }
  return (
    <>
      <Sheet open={!!data} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="
    w-full
    p-0
    sm:max-w-4xl
    lg:max-w-3xl
    flex
    flex-col
    overflow-hidden
    bg-gradient-to-br
    from-blue-700
    via-blue-600
    to-blue-500
  "
        >
          {data ? (
            <div className="min-h-0 flex-1 overflow-y-auto
          bg-gradient-to-br
          from-blue-700
          via-blue-600
          to-blue-500">

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
                    <RatingStars
                      size="sm"
                      value={isEditing && draft
                        ? draft.rating
                        : data.rating
                      }
                      editable={isEditing}
                      onChange={
                        isEditing && draft
                          ? (rating) =>
                            setDraft({
                              ...draft,
                              rating,
                            })
                          : undefined
                      }
                    />
                  </Row>

                  <Row
                    label="Preço"
                    icon={Wallet}
                  >
                    {isEditing && draft ? (
                      <Input
                        type="number"
                        value={draft.price}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            price: Number(e.target.value),
                          })
                        }
                        className="h-9 w-32 bg-white text-right"
                      />
                    ) : (
                      `R$ ${data.price.toFixed(2)}`
                    )}
                  </Row>

                  <Row
                    label="Data do consumo"
                    icon={CalendarDays}
                  >
                    {formatDate(data.date)}
                  </Row>

                  <Row
                    label="Compraria novamente"
                    icon={RefreshCw}
                  >
                    {data.wouldBuyAgain ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600">
                        <ThumbsUp className="size-3.5" />
                        Sim
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-600">
                        <ThumbsDown className="size-3.5" />
                        Não
                      </span>
                    )}
                  </Row>

                  <Row
                    label="Motivo do consumo"
                    icon={CircleHelp}
                  >
                    {isEditing && draft ? (
                      <ConsumptionReasonFilter
                        addLabel={false}
                        onChange={(reasonId) => setReasonId(Number(reasonId))}
                        consumptionReasons={consumptionReasons}
                        value={data.reason.friendlyName} />) :
                      (data.reason.friendlyName)}
                  </Row>

                  <Row
                    label="Influência"
                    icon={Sparkles}
                  >
                    {isEditing && draft ? (
                      <ConsumptionInfluenceFilter
                        addLabel={false}
                        onChange={(value) =>

                          setInfluenceId(Number(value))
                        }
                        influences={consumptionInfluences}
                        value={String(
                          influenceId ?? data.influence.id
                        )}
                      />
                    ) : (
                      data.influence.friendlyName
                    )}
                  </Row>

                  {data.address && (
                    <Row
                      label="Endereço"
                      icon={MapPin}
                    >
                      {data.address}
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

                    <div className="flex flex-wrap pt-3 gap-2">
                      {data.negativeAspects.map((aspect) => (
                        <span
                          key={aspect.id}
                          className="
                      rounded-full
                      border border-red-200
                      bg-red-50
                      px-3 py-1.5
                      text-xs
                      font-medium
                      text-red-700
                    "
                        >
                          {aspect.friendlyName}
                        </span>
                      ))}
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
                      {data.details}
                    </p>
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
                    onClick={isEditing ? onSaveEditions : startEditing}
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
                bg-blue-900 text-offWhite
                hover:bg-red-400
                hover:text-red-900
              "
                    onClick={() => setConfirming(true)}
                  >
                    <Trash2 className="size-4" />
                    Excluir experiência
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>

      <Modal buttonText="Excluir" dialogTitle="Excluir este consumo?" dialogDescription="Esta ação não pode ser desfeita. O registro será removido permanentemente do seu histórico."
        open={confirming} onOpenChange={setConfirming} onConfirm={onDeleteConsumptionBtnClick} />

    </>
  );
}
