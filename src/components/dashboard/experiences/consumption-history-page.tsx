"use client";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ClipboardList, PackageOpen, Plus, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsumptionFilters } from "@/components/dashboard/experiences/consumption-filters";
import { ConsumptionList } from "@/components/dashboard/experiences/consumption-list";
import { ConsumptionSummary } from "@/components/dashboard/experiences/consumption-summary";
import { ConsumptionDetails } from "@/components/dashboard/experiences/consumption-details";
import { EmptyState } from "@/components/dashboard/experiences/empty-state";
import { Pagination } from "@/components/dashboard/experiences/pagination";
import {
    defaultFilters,
    filterConsumptions,
    sortConsumptions,
    summarize,
    type ConsumptionFilterState,
    type SortOption,
} from "@/lib/consumption-filters";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";


const PAGE_SIZE = 12;

export default function ConsumptionsHistoryPage({ consumptionsWithItems, categories }: { consumptionsWithItems: ReadConsumptionModel[]; categories: CategoryModel[] }) {

    // const onlyConsumptions = consumptionsWithItems.map((c) => c.consumption);
    const [consumptions, setConsumptions] = useState<ReadConsumptionModel[]>(consumptionsWithItems);
    const [error, setError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const [filters, setFilters] = useState<ConsumptionFilterState>(defaultFilters);
    const [sort, setSort] = useState<SortOption>("recent");
    const [expanded, setExpanded] = useState(false);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<ReadConsumptionModel | null>(null);

    const filtered = useMemo(
        () => sortConsumptions(filterConsumptions(consumptions, filters), sort),
        [consumptions, filters, sort],
    );
    const stats = useMemo(() => summarize(filtered), [filtered]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const visible = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    function patchFilters(patch: Partial<ConsumptionFilterState>) {
        setFilters((prev) => ({ ...prev, ...patch }));
        setPage(1);
    }

    function clearFilters() {
        setFilters(defaultFilters);
        setPage(1);
    }

    const hasAny = consumptions.length > 0;

    return (
        <main
            className="min-h-screen py-10"
            style={{ background: "var(--gradient-subtle)" }}
        >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            Meus Consumos
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Consulte e analise suas experiências de consumo registradas.
                        </p>
                    </div>
                    <Button asChild className="h-11">
                        <Link href="/dashboard/experiences/new-experience">
                            <Plus className="size-4" />
                            Registrar consumo
                        </Link>
                    </Button>
                </header>

                <div className="mt-6 space-y-5">
                    <ConsumptionFilters
                        filters={filters}
                        onChange={patchFilters}
                        onClear={clearFilters}
                        sort={sort}
                        onSortChange={(s) => {
                            setSort(s);
                            setPage(1);
                        }}
                        expanded={expanded}
                        categories={categories}
                        onToggleExpanded={() => setExpanded((v) => !v)

                        }
                    />

                    {error ? (
                        <EmptyState
                            icon={AlertTriangle}
                            title="Não foi possível carregar seus consumos."
                            description="Ocorreu um erro ao buscar o histórico. Tente novamente em instantes."
                            action={
                                <Button onClick={() => setReloadKey((k) => k + 1)}>
                                    Tentar novamente
                                </Button>
                            }
                        />

                    ) : !hasAny ? (
                        <EmptyState
                            icon={PackageOpen}
                            title="Você ainda não registrou nenhum consumo."
                            description="Registre sua primeira experiência para começar a acompanhar seus padrões de consumo."
                            action={
                                <Button asChild className="h-11">
                                    <Link href="/dashboard/experiences/new-experience">
                                        <Plus className="size-4" />
                                        Registrar consumo
                                    </Link>
                                </Button>
                            }
                        />
                    ) : filtered.length === 0 ? (
                        <EmptyState
                            icon={SearchX}
                            title="Nenhum consumo encontrado."
                            description="Tente alterar ou remover alguns filtros."
                            action={
                                <Button variant="outline" onClick={clearFilters}>
                                    Limpar filtros
                                </Button>
                            }
                        />
                    ) : (
                        <>
                            <ConsumptionSummary
                                total={stats.total}
                                avg={stats.avg}
                                buyAgainPct={stats.buyAgainPct}
                            />
                            <ConsumptionList
                                consumptions={visible}
                                onOpen={(c) => setSelected(c)}
                            />
                            <Pagination
                                shown={visible.length}
                                total={filtered.length}
                                page={currentPage}
                                pageCount={pageCount}
                                onPageChange={(p) => setPage(p)}
                                onLoadMore={
                                    pageSize < filtered.length
                                        ? () => setPageSize((s) => s + PAGE_SIZE)
                                        : undefined
                                }
                            />
                        </>
                    )}
                </div>

                {!error && hasAny ? (
                    <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <ClipboardList className="size-3.5" />
                        Histórico de Consumo — somente você vê estes registros.
                    </p>
                ) : null}
            </div>

            <ConsumptionDetails
                data={selected}
                onOpenChange={(open) => {
                    if (!open) setSelected(null);
                }}
                onEdit={() => {
                    setSelected(null);
                    redirect("/dashboard/experiences/new-experience");
                }}
                onDelete={(c) => {
                    setConsumptions((prev) => prev.filter((x) => x.id !== c.id));
                    setSelected(null);
                }}
            />
        </main>
    );
}
