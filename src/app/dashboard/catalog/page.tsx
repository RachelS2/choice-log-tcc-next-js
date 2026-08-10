'use client'
import { useState, useMemo, useEffect, useCallback } from 'react';
import CatalogEmptyState from '@/components/dashboard/catalog/catalog-empty-state';
import CatalogFilters from '@/components/dashboard/catalog/catalog-filter';
import CatalogGrid from '@/components/dashboard/catalog/catalog-grid';
import CatalogHeader from '@/components/dashboard/catalog/catalog-header';
import { fetchCatalogItemsRepository } from '@/lib/repository/catalog-repository';
import ItemFormModal from '@/components/dashboard/items/new-item/item-form-modal';
import { ItemDisplayModel, ItemTypeEnum } from '@/models/dashboard/items';

export type SortOption = 'recent' | 'last_consumed' | 'most_experiences' | 'alphabetical';
export type TypeFilter = 'ALL' | 'PRODUCT' | 'SERVICE';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [sort, setSort] = useState<SortOption>('recent');
  const [catalogItems, setCatalogItems] = useState<ItemDisplayModel[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  // Load categories when type changes
  useCallback(async (type: ItemTypeEnum) => {
    try {
      const cats = await fetchCatalogItemsRepository(type);
      setCatalogItems(cats);
      console.log(cats)
    } finally {
    }
  }, []);


  const categories: string[] = useMemo(
    () => [...new Set(catalogItems.map((item) => item.category))],
    []
  );

  const brands: string[] = useMemo(
    () => [...new Set(catalogItems.map((item) => item.brand))],
    []
  );

  const filteredItems: ItemDisplayModel[] = useMemo(() => {
    let items = [...catalogItems];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter((item) => item.friendlyName.toLowerCase().includes(query));
    }

    // Type filter
    if (typeFilter !== 'ALL') {
      items = items.filter((item) => item.type === typeFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      items = items.filter((item) => item.category === categoryFilter);
    }

    // Brand filter
    if (brandFilter !== 'all') {
      items = items.filter((item) => item.brand === brandFilter);
    }

    // Sort
    switch (sort) {
      case 'recent':
        // Keep original order (most recently added)
        break;
      case 'last_consumed':
        items.sort(
          (a, b) => new Date(b.lastConsumed).getTime() - new Date(a.lastConsumed).getTime()
        );
        break;
      case 'most_experiences':
        items.sort((a, b) => b.experiences - a.experiences);
        break;
      case 'alphabetical':
        items.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
        break;
    }

    return items;
  }, [search, typeFilter, categoryFilter, brandFilter, sort]);

  return (
    <div className="p-11 space-y-6">
      <CatalogHeader onNewItem={() => setModalOpen(true)} />
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
      {filteredItems.length > 0 ? (
        <CatalogGrid items={filteredItems} />
      ) : (
        <CatalogEmptyState />
      )}
      <ItemFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={(item) => { /* item criado */ }}
      />

    </div>
  );
}