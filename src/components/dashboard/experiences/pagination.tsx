import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pagination({
    shown,
    total,
    page,
    pageCount,
    onPageChange,
    onLoadMore,
}: {
    shown: number;
    total: number;
    page: number;
    pageCount: number;
    onPageChange: (p: number) => void;
    onLoadMore?: () => void;
}) {
    const canLoadMore = !!onLoadMore && shown < total;

    return (
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Mostrando <strong className="font-medium text-foreground">{shown}</strong>{" "}
                de <strong className="font-medium text-foreground">{total}</strong>{" "}
                {total === 1 ? "consumo" : "consumos"}
            </p>

            <div className="flex items-center gap-2">
                {canLoadMore ? (
                    <Button variant="outline" onClick={onLoadMore}>
                        <Plus className="size-4" />
                        Carregar mais
                    </Button>
                ) : null}
                {pageCount > 1 ? (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Página anterior"
                            disabled={page <= 1}
                            onClick={() => onPageChange(page - 1)}
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        <span className="min-w-24 text-center text-sm text-muted-foreground">
                            Página {page} de {pageCount}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Próxima página"
                            disabled={page >= pageCount}
                            onClick={() => onPageChange(page + 1)}
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    );
}
