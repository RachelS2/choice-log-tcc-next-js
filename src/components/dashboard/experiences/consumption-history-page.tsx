"use client";
import { useMemo, useState } from "react";
import {  ClipboardList, PackageOpen, Plus, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsumptionFilters } from "@/components/dashboard/experiences/consumption-filters";
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

    const hasAny = consumptions.length > 0;

    return (
        <main
            className="min-h-screen py-10"
            style={{ background: "var(--gradient-subtle)" }}
        >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
                <ConsumptionHeader />

                <div className="mt-6 space-y-5">
                    <ConsumptionFilters
                        consumptionInfluences={consumptionInfluences}
                        filters={filters}
                        consumptionReasons={consumptionReasons}
                        onChange={patchFilters}
                        sort={sort}
                        onSortChange={(s) => {
                            setSort(s);
                            setPage(1);
                        }}
                        categories={categories}
                    />

                    {!hasAny ? (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="max-w-lg mt-8 shadow-md border-b border-blue-900 flex items-center justify-center w-full rounded-2xl bg-white max-w-5xl px-4 sm:px-6">

                                <NotificationContent
                                    icon={PackageOpen}
                                    title="Você ainda não registrou nenhum consumo."
                                    description="Registre sua primeira experiência para começar a acompanhar seus padrões de consumo."

                                />
                            </div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <NotificationContent
                            icon={SearchX}
                            title="Nenhum consumo encontrado."
                            description="Tente alterar ou remover alguns filtros."
                            children={
                                <Button variant="outline" className="bg-white text-blue-900 hover:bg-muted hover:text-blue-900 hover:font-semibold" onClick={clearFilters}>
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
        </main>
    );
}
