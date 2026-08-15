'use client'
import { useState, useMemo, useCallback, useEffect } from 'react';
import CatalogEmptyState from '@/components/dashboard/catalog/catalog-empty-state';
import CatalogFilters from '@/components/dashboard/catalog/catalog-filter';
import CatalogGrid from '@/components/dashboard/catalog/catalog-grid';
import CatalogHeader from '@/components/dashboard/catalog/catalog-header';
import NewItemFormModal from '@/components/dashboard/items/new-item/new-item-form-modal';
import { CategoryModel, ItemDisplayModel, ItemTypeEnum } from '@/models/dashboard/items';
import { getItemsController } from '@/lib/controller/item-controller';
import { toast } from 'sonner';
import { fetchCategoriesController } from '@/lib/controller/category-controller';
import CatalogLoadingState from '@/components/dashboard/catalog/catalog-loading-state';

export type SortOption = 'recent' | 'last_consumed' | 'most_experiences' | 'alphabetical' | 'most_spent';
export type TypeFilter = 'ALL' | ItemTypeEnum;

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [sort, setSort] = useState<SortOption>('recent');
  const [catalogItems, setCatalogItems] = useState<ItemDisplayModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  function handleItemDelete(itemId: string) {
    setCatalogItems((catalogItems) =>
      catalogItems.filter((item) => item.id !== itemId)
    );
  }
  const [loading, setIsLoading] = useState(false);
  const fetchCatalogItems = async () => {
    setIsLoading(true);
    try {
      const items = await getItemsController();
      setCatalogItems(items);
    } catch (error) {
      toast.error('Failed to fetch catalog items');
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogItems();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchCategoriesController(typeFilter === 'ALL' ? undefined : typeFilter as ItemTypeEnum);
        setCategories(categories);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, [typeFilter]);

  const brands: string[] = useMemo(
    () => [...new Set(catalogItems.map((item) => item.brand))],
    [catalogItems]
  );

  const filteredItems: ItemDisplayModel[] = useMemo(() => {
    let items = [...catalogItems];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();

      items = items.filter((item) =>
        item.friendlyName.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== 'ALL') {
      items = items.filter((item) => item.type === typeFilter);
    }

    // Category filter
    if (categoryFilter !== 'ALL') {
      items = items.filter(
        (item) => item.category === categoryFilter
      );
    }

    // Brand filter
    if (brandFilter !== 'ALL') {
      items = items.filter(
        (item) => item.brand === brandFilter
      );
    }

    // Sort
    switch (sort) {
      case 'recent':
        // Keep original order
        break;

      case 'last_consumed':

        items.sort((a, b) => {
          if (a.lastConsumed === null && b.lastConsumed === null) {
            return 0;
          }

          if (a.lastConsumed === null) {
            return 1;
          }

          if (b.lastConsumed === null) {
            return -1;
          }

          return (
            new Date(b.lastConsumed).getTime() -
            new Date(a.lastConsumed).getTime()
          );
        });

        break;
      case 'most_experiences':
        items.sort(
          (a, b) => b.experiences - a.experiences
        );
        break;

      case 'alphabetical':
        items.sort((a, b) =>
          a.friendlyName.localeCompare(b.friendlyName)
        );
        break;
      case 'most_spent':
        items.sort(
          (a, b) => b.totalSpent - a.totalSpent
        );
        break;
    }

    return items;
  }, [
    catalogItems,
    search,
    typeFilter,
    categoryFilter,
    brandFilter,
    sort,
  ]);

  return (
    <div className="p-11 space-y-6">
      <CatalogHeader
        onNewItem={() => setModalOpen(true)}
      />

      <CatalogFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        brandFilter={brandFilter}
        onBrandFilterChange={setBrandFilter}
        sort={sort}
        onSortChange={setSort}
        categories={categories}
        brands={brands}
      />

      {loading ? (
        <CatalogLoadingState />
      ) : filteredItems.length > 0 ? (
        <CatalogGrid items={filteredItems} onDelete={handleItemDelete} />
      ) : (
        <CatalogEmptyState />
      )}

      <NewItemFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={async () => {
          await fetchCatalogItems();
          setModalOpen(false);
        }}
      />
    </div>
  );
}