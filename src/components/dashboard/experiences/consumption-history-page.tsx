"use client";
import { useMemo, useState } from "react";
import { ClipboardList, PackageOpen, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsumptionFilters, ConsumptionFiltersPanel } from "@/components/dashboard/experiences/consumption-filters";
import { ConsumptionList } from "@/components/dashboard/experiences/consumption-list";
import { ConsumptionSummary } from "@/components/dashboard/experiences/consumption-summary";
import { ConsumptionDetails } from "@/components/dashboard/experiences/consumption-details";
import { Pagination } from "@/components/dashboard/experiences/pagination";
import {
    defaultFilters,
    filterConsumptions,
    sortConsumptions,
    summarize,
    type ConsumptionFilterState,
} from "@/lib/consumption-filters";
import { redirect } from "next/navigation";
import { ConsumptionInfluenceModel, ConsumptionReasonModel, ReadConsumptionModel, SortConsumptionsOptions } from "@/models/dashboard/consumption";
import { CategoryModel } from "@/models/dashboard/items";
import ConsumptionHeader from "./consumption-header";
import { NotificationContent } from "@/components/ui/choicelog-notification-card";
import { ActiveFilterChip, ActiveFiltersChips } from "@/components/ui/choicelog-chips";
import { buildConsumptionFilterChips } from "./consumption-chips-builder";


const PAGE_SIZE = 12;

export default function ConsumptionsHistoryPage({ consumptionsWithItems, categories, consumptionInfluences, consumptionReasons }:
    { consumptionsWithItems: ReadConsumptionModel[]; categories: CategoryModel[]; consumptionInfluences: ConsumptionInfluenceModel[]; consumptionReasons: ConsumptionReasonModel[] }) {

    // const onlyConsumptions = consumptionsWithItems.map((c) => c.consumption);
    const [consumptions, setConsumptions] = useState<ReadConsumptionModel[]>(consumptionsWithItems);

    const [filters, setFilters] = useState<ConsumptionFilterState>(defaultFilters);
    const [sort, setSort] = useState<SortConsumptionsOptions>("recent");
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<ReadConsumptionModel | null>(null);

    const filtered: ReadConsumptionModel[] = useMemo(
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

    const chips: ActiveFilterChip[] = buildConsumptionFilterChips({
        filters,
        patchFilters,
        consumptionReasons,
        consumptionInfluences,
    });

    const hasAny = consumptions.length > 0;
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    return (
        <main
            className="min-h-screen py-10"
            style={{ background: "var(--gradient-subtle)" }}
        >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <ConsumptionHeader />

                    <ConsumptionFilters
                        filters={filters}
                        onChange={patchFilters}
                        expanded={filtersExpanded}
                        setExpanded={setFiltersExpanded}
                    />

                </div>

                <div className="mt-6 border-b border-border" />

                {/* Filtros expandidos */}
                {filtersExpanded && (
                    <div className="pt-6">
                        <ConsumptionFiltersPanel
                            consumptionInfluences={consumptionInfluences}
                            consumptionReasons={consumptionReasons}
                            filters={filters}
                            onChange={patchFilters}
                            sort={sort}
                            onSortChange={(sort) => {
                                setSort(sort);
                                setPage(1);
                            }}
                            categories={categories}
                        />
                    </div>
                )}
                <div className="mt-5">
                    <ActiveFiltersChips chips={chips} />
                </div>

                <div className="mt-8">
                    {!hasAny ? (
                        <NotificationContent
                            icon={PackageOpen}
                            title="Você ainda não registrou nenhum consumo."
                            description="Registre sua primeira experiência para começar a acompanhar seus padrões de consumo."
                        />
                    ) : filtered.length === 0 ? (
                        <NotificationContent
                            icon={SearchX}
                            title="Nenhum consumo encontrado."
                            description="Tente alterar ou remover alguns filtros."
                        >
                            <Button
                                variant="outline"
                                className="bg-blue-900 text-white hover:bg-blue-950 justify-center  hover:font-semibold"
                                onClick={clearFilters}
                            >
                                Limpar filtros
                            </Button>
                        </NotificationContent>
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


                {hasAny ? (
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
        </main >
    );
}
