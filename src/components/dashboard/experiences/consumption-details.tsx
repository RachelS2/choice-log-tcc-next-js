import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Package,
  Pencil,
  Sparkles,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ITEM_TYPE, itemInitials } from "@/lib/consumption-data";
import { formatBRL, formatDate, type Consumption } from "@/lib/consumptions-mock";
import { Stars } from "./stars";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground sm:text-right">
        {children}
      </span>
    </div>
  );
}

function NotProvided() {
  return <span className="text-sm font-normal text-muted-foreground/70">Não informado</span>;
}

export function ConsumptionDetails({
  consumption,
  onOpenChange,
  onEdit,
  onDelete,
}: {
  consumption: Consumption | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (c: Consumption) => void;
  onDelete: (c: Consumption) => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <Sheet open={!!consumption} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          {consumption ? (
            <>
              <SheetHeader>
                <SheetTitle>Detalhes do consumo</SheetTitle>
                <SheetDescription>
                  Registrado em {formatDate(consumption.createdAt)}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-8 px-4 pb-8">
                <section className="flex gap-4">
                  {consumption.item.imageUrl ? (
                    <img
                      src={consumption.item.imageUrl}
                      alt={consumption.item.name}
                      className="size-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="grid size-20 shrink-0 place-items-center rounded-2xl border border-primary/15 bg-primary/10 text-xl font-semibold text-primary">
                      {itemInitials(consumption.item.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {consumption.item.name}
                    </h3>
                    {consumption.item.brand ? (
                      <p className="text-sm text-muted-foreground">
                        {consumption.item.brand}
                      </p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {consumption.item.typeId === ITEM_TYPE.SERVICE ? (
                          <Sparkles className="size-3" />
                        ) : (
                          <Package className="size-3" />
                        )}
                        {consumption.item.typeId === ITEM_TYPE.SERVICE
                          ? "Serviço"
                          : "Produto"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        <Tag className="size-3" />
                        {consumption.item.category}
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Experiência
                  </h4>
                  <Row label="Avaliação">
                    <Stars rating={consumption.rating} />
                  </Row>
                  <Row label="Preço">{formatBRL(consumption.price)}</Row>
                  <Row label="Data do consumo">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-muted-foreground" />
                      {formatDate(consumption.date)}
                    </span>
                  </Row>
                  <Row label="Compraria novamente">
                    {consumption.wouldBuyAgain === null ? (
                      <NotProvided />
                    ) : consumption.wouldBuyAgain ? (
                      <span className="inline-flex items-center gap-1.5 text-success">
                        <ThumbsUp className="size-3.5" /> Sim
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-destructive">
                        <ThumbsDown className="size-3.5" /> Não
                      </span>
                    )}
                  </Row>
                  <Row label="Motivo do consumo">
                    {consumption.reason.friendlyName}
                  </Row>
                  <Row label="Influência">
                    {consumption.influence.friendlyName}
                  </Row>
                  {consumption.address ? (
                    <Row label="Endereço">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground" />
                        {consumption.address}
                      </span>
                    </Row>
                  ) : null}
                </section>

                {consumption.negativeAspects.length > 0 ? (
                  <section>
                    <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Aspectos negativos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {consumption.negativeAspects.map((a) => (
                        <span
                          key={a.id}
                          className="rounded-full border border-destructive/25 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive"
                        >
                          {a.friendlyName}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : null}

                {consumption.details ? (
                  <section>
                    <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Observações
                    </h4>
                    <p className="rounded-xl bg-muted/60 p-4 text-sm text-foreground">
                      {consumption.details}
                    </p>
                  </section>
                ) : null}

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    className="h-11 flex-1"
                    onClick={() => onEdit(consumption)}
                  >
                    <Pencil className="size-4" />
                    Editar consumo
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setConfirming(true)}
                  >
                    <Trash2 className="size-4" />
                    Excluir consumo
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir este consumo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O registro será removido
              permanentemente do seu histórico.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (consumption) onDelete(consumption);
                setConfirming(false);
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
