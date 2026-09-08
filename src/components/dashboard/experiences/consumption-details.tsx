import { useState } from "react";
import {
  CalendarDays,
  CircleHelp,
  Clock,
  LucideIcon,
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
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { ItemHero } from "@/components/ui/choicelog-item-hero";
import { RatingStars } from "@/components/ui/rating-starts";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import Modal from "@/components/ui/choicelog-modal";

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
export function ConsumptionDetails({
  data,
  onOpenChange,
  onEdit,
  onDelete,
}: {
  data: ReadConsumptionModel | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (c: ReadConsumptionModel) => void;
  onDelete: (c: ReadConsumptionModel) => void;
}) {
  const [confirming, setConfirming] = useState(false);

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
      w-full overflow-y-auto 
      bg-background
      p-0
      sm:max-w-xl
    "
        >
          {data ? (
            <div className="min-h-full 
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
              <div className="

          px-6
          pb-6
          text-white
        ">

                <PageHeader
                  header="Experiência"
                  textClassName="text-base text-foreground"
                  lineAfter
                  lineClassName="bg-foreground"
                />
                <div className="mt-6 p-3 justify-center items-center bg-blue-50 shadow-md rounded-2xl ">
                  <ItemHero item={data.item} />
                </div>
                <div className="p-3 border-b border-blue-900" />
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
                      value={data.rating}
                    />
                  </Row>

                  <Row
                    label="Preço"
                    icon={Wallet}
                  >
                    {"R$ " + data.price.toFixed(2)}
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
                    {data.reason.friendlyName}
                  </Row>

                  <Row
                    label="Influência"
                    icon={Sparkles}
                  >
                    {data.influence.friendlyName}
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
                  text-foreground
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
            gap-2
            sm:flex-row  bg-gradient-to-br
          from-blue-700
          via-blue-600
          to-blue-500
          ">
                  <Button
                    className="h-11 flex-1"
                    onClick={() => onEdit(data)}
                  >
                    <Pencil className="size-4" />
                    Editar experiência
                  </Button>

                  <Button
                    variant="outline"
                    className="
                h-11
                flex-1
                border border-blue-900
                bg-blue-900 text-foreground
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
