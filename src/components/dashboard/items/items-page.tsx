'use client'
import { useState, useMemo, useCallback, useEffect } from 'react';
import ItemsFiltersPanel, { ItemsFilters } from '@/components/dashboard/items/items-filter';
import ItemsHeader from '@/components/dashboard/items/items-header';
import CreateUpdateItemModal from '@/components/dashboard/items/create-item-modal';
import { CategoryModel, ItemResumeModel, ItemTypeEnum, PostItemModel, UpdatedItemModel } from '@/models/dashboard/items';
import ItemsLoadingState from '@/components/dashboard/items/items-loading-state';
import { SortItemsOptions } from '@/models/dashboard/consumption';
import { PackageOpen } from 'lucide-react';
import { NotificationContent } from '@/components/ui/choicelog-notification-card';
import { ActiveFiltersChips } from '@/components/ui/choicelog-chips';
import { buildItemsFilterChips, ItemsFilterState, defaultFilters, filterItems, sortItems } from '@/lib/items-filters-utils';
import { Button } from '@/components/ui/button';
import ItemsCard from './item-card';
import { toast } from 'sonner';

export type TypeFilter = 'ALL' | ItemTypeEnum;

interface ItemsPageProps {
    items: ItemResumeModel[];
    categories: CategoryModel[];
    onDeleteItemServer: (itemId: string) => void;
    onCreateItemServer: (itemId: PostItemModel) => Promise<ItemResumeModel>;
    onEditItemServer: (item: UpdatedItemModel) => Promise<ItemResumeModel>;
}

export default function ItemsPageClient({ categories, items, onDeleteItemServer, onCreateItemServer, onEditItemServer }: ItemsPageProps) {
    const [filters, setFilters] =
        useState<ItemsFilterState>(defaultFilters);
    const [loading, setIsLoading] = useState(false);

    const [pageItems, setPageItems] =
        useState<ItemResumeModel[]>(items);
    const [sort, setSort] =
        useState<SortItemsOptions>("recent");

    const [modalOpen, setModalOpen] = useState(false);
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    const patchFilters = (
        patch: Partial<ItemsFilterState>
    ) => {
        setFilters((current) => ({
            ...current,
            ...patch,
        }));
    };

    function clearFilters() {
        setFilters(defaultFilters);
    }


    const brands = useMemo(
        () => [
            ...new Set(
                pageItems
                    .map((item) => item.brand)
                    .filter(Boolean)
            ),
        ],
        [pageItems]
    );

    const filteredItems = useMemo(() => {
        const filtered = filterItems(
            pageItems,
            filters
        );

        return sortItems(filtered, sort);
    }, [pageItems, filters, sort]);

    const chips = buildItemsFilterChips({
        filters,
        patchFilters, categories
    });


    const handleEditItem = async (
        item: UpdatedItemModel
    ): Promise<ItemResumeModel> => {
        const updatedItem = await onEditItemServer(item);
        setPageItems((currentItems) =>
            currentItems.map((currentItem) =>
                currentItem.id === updatedItem.id
                    ? updatedItem
                    : currentItem
            )
        );

        return updatedItem;

    };

    const handleItemDelete = (itemId: string) => {
        setIsLoading(true);
        onDeleteItemServer(itemId);
        setPageItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== itemId
            )
        );
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen py-10">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                    <ItemsHeader />

                    <ItemsFilters
                        filters={filters}
                        onChange={patchFilters}
                        expanded={filtersExpanded}
                        setExpanded={setFiltersExpanded}

                        onNewItem={() => setModalOpen(true)}

                    />
                </div>
                <div className="mt-6 border-b border-border" />

                {/* Filtros expandidos */}
                {filtersExpanded && (
                    <div className="pt-6">
                        <ItemsFiltersPanel
                            typeFilter={filters.type}
                            onTypeFilterChange={(type) =>
                                patchFilters({
                                    type,
                                    // importante ao trocar o tipo
                                    category: "all",
                                })
                            }
                            categoryFilter={filters.category}
                            onCategoryFilterChange={(category) =>
                                patchFilters({ category })
                            }
                            brandFilter={filters.brand}
                            onBrandFilterChange={(brand) =>
                                patchFilters({ brand })
                            }
                            sort={sort}
                            onSortChange={setSort}
                            categories={categories}
                            brands={brands}
                        />
                    </div>
                )}
                <div className="mt-5">
                    <ActiveFiltersChips chips={chips} />
                </div>

                <div className="mt-8">
                    {loading ? (
                        <ItemsLoadingState
                            title="Carregando itens..."
                            description="Estamos preparando seu catálogo. Isso deve levar apenas alguns instantes."
                        />
                    ) : filteredItems.length > 0 ? (
                        <div className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                            {filteredItems.map((item) => (
                                <ItemsCard
                                    key={item.id}
                                    item={item}
                                    onDelete={handleItemDelete}
                                    onEdit={handleEditItem}
                                    categories={categories}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotificationContent
                            icon={PackageOpen}
                            title="Nenhum item encontrado"
                            description="Tente alterar ou remover alguns filtros.">
                            <Button
                                variant="outline"
                                className="bg-blue-900 text-white hover:bg-blue-950 justify-center  hover:font-semibold"
                                onClick={clearFilters}
                            >
                                Limpar filtros
                            </Button>
                        </NotificationContent>
                    )}
                </div>

                <CreateUpdateItemModal
                    open={modalOpen}
                    mode="create"
                    onOpenChange={setModalOpen}
                    categories={categories}
                    onCreateItemServer={async (item: PostItemModel) => {
                        const itemResume = await onCreateItemServer(item);

                        setPageItems((previousItems) => [
                            itemResume,
                            ...previousItems,
                        ]);

                        return itemResume;
                    }}

                    onEditItemServer={null}
                />
            </div>
        </main >
    );
}