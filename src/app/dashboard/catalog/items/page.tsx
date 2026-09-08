'use client'
import { useState, useMemo, useCallback, useEffect } from 'react';
import CatalogFiltersPanel, { CatalogFilters } from '@/components/dashboard/catalog/catalog-filter';
import CatalogGrid from '@/components/dashboard/catalog/catalog-grid';
import CatalogHeader from '@/components/dashboard/catalog/catalog-header';
import CreateUpdateItemModal from '@/components/dashboard/items/create-item-modal';
import { CategoryModel, CreateUpdateItemModel, ItemTypeEnum } from '@/models/dashboard/items';
import { getItemsController } from '@/lib/controller/item-controller';
import { toast } from 'sonner';
import { fetchCategoriesController } from '@/lib/controller/category-controller';
import CatalogLoadingState from '@/components/dashboard/catalog/catalog-loading-state';
import { SortItemsOptions } from '@/models/dashboard/consumption';
import { PackageOpen } from 'lucide-react';
import { NotificationContent } from '@/components/ui/choicelog-notification-card';
import { ActiveFilterChip, ActiveFiltersChips } from '@/components/ui/choicelog-chips';
import { buildCatalogFilterChips, CatalogFilterState, defaultFilters, filterItems, sortItems } from '@/lib/catalog-filters';
import { Button } from '@/components/ui/button';

export type TypeFilter = 'ALL' | ItemTypeEnum;

export default function CatalogPage() {
  const [filters, setFilters] =
    useState<CatalogFilterState>(defaultFilters);

  const [sort, setSort] =
    useState<SortItemsOptions>("recent");

  const [catalogItems, setCatalogItems] =
    useState<CreateUpdateItemModel[]>([]);

  const [categories, setCategories] =
    useState<CategoryModel[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const patchFilters = (
    patch: Partial<CatalogFilterState>
  ) => {
    
    setFilters((current) => ({
      ...current,
      ...patch,
    }));
    console.log("DEFAULT FILTERS: " + defaultFilters);
  };
  function clearFilters() {
    setFilters(defaultFilters);
  }
  const fetchCatalogItems = async () => {
    setIsLoading(true);

    try {
      const items = await getItemsController();
      setCatalogItems(items);
    } catch {
      toast.error("Erro ao buscar itens.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogItems();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories =
          await fetchCategoriesController(
            true,
            filters.type === "ALL"
              ? undefined
              : (filters.type as ItemTypeEnum)
          );

        setCategories(categories);
      } catch {
        toast.error("Erro ao buscar categorias.");
      }
    };

    fetchCategories();
  }, [filters.type]);

  const brands = useMemo(
    () => [
      ...new Set(
        catalogItems
          .map((item) => item.brand)
          .filter(Boolean)
      ),
    ],
    [catalogItems]
  );

  const filteredItems = useMemo(() => {
    const filtered = filterItems(
      catalogItems,
      filters
    );

    return sortItems(filtered, sort);
  }, [catalogItems, filters, sort]);

  const chips = buildCatalogFilterChips({
    filters,
    patchFilters, categories
  });

  console.log(chips)

  const handleEditItem = (
    updatedItem: CreateUpdateItemModel
  ) => {
    setCatalogItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedItem.id
          ? updatedItem
          : item
      )
    );
  };

  const handleItemDelete = (itemId: string) => {
    setCatalogItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId
      )
    );
  };

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <CatalogHeader />

          <CatalogFilters
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
            <CatalogFiltersPanel
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
            <CatalogLoadingState
              title="Carregando itens..."
              description="Estamos preparando seu catálogo. Isso deve levar apenas alguns instantes."
            />
          ) : filteredItems.length > 0 ? (
            <CatalogGrid
              items={filteredItems}
              onDelete={handleItemDelete}
              onEdit={handleEditItem}
              categories={categories}
            />
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
          onSuccess={async () => {
            await fetchCatalogItems();
            setModalOpen(false);
          }}
        />
      </div>
    </main >
  );
}