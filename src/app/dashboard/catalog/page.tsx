'use client'
import { useState, useMemo } from 'react';
import CatalogEmptyState from '@/components/dashboard/catalog/catalog-empty-state';
import CatalogFilters from '@/components/dashboard/catalog/catalog-filter';
import CatalogGrid from '@/components/dashboard/catalog/catalog-grid';
import CatalogHeader from '@/components/dashboard/catalog/catalog-header';


export interface CatalogItem {
  id: string;
  name: string;
  brand: string;
  type: 'product' | 'service';
  category: string;
  image: string | null;
  experiences: number;
  averageRating: number;
  lastConsumed: string;
}

const mockItems: CatalogItem[] = [
  {
    id: '1',
    name: 'Coca-Cola Zero',
    brand: 'Coca-Cola',
    type: 'product',
    category: 'Bebidas',
    image: null,
    experiences: 8,
    averageRating: 4.3,
    lastConsumed: '2026-07-20',
  },
  {
    id: '2',
    name: 'Spotify Premium',
    brand: 'Spotify',
    type: 'service',
    category: 'Entretenimento',
    image: null,
    experiences: 12,
    averageRating: 4.7,
    lastConsumed: '2026-08-01',
  },
  {
    id: '3',
    name: 'AirPods Pro',
    brand: 'Apple',
    type: 'product',
    category: 'Eletrônicos',
    image: null,
    experiences: 5,
    averageRating: 4.8,
    lastConsumed: '2026-07-15',
  },
  {
    id: '4',
    name: 'Netflix Standard',
    brand: 'Netflix',
    type: 'service',
    category: 'Entretenimento',
    image: null,
    experiences: 24,
    averageRating: 3.9,
    lastConsumed: '2026-08-03',
  },
  {
    id: '5',
    name: 'Café Especial Orfeu',
    brand: 'Orfeu',
    type: 'product',
    category: 'Alimentos',
    image: null,
    experiences: 15,
    averageRating: 4.5,
    lastConsumed: '2026-08-02',
  },
  {
    id: '6',
    name: 'Uber Black',
    brand: 'Uber',
    type: 'service',
    category: 'Transporte',
    image: null,
    experiences: 6,
    averageRating: 4.1,
    lastConsumed: '2026-07-28',
  },
];

export type SortOption = 'recent' | 'last_consumed' | 'most_experiences' | 'alphabetical';
export type TypeFilter = 'all' | 'product' | 'service';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sort, setSort] = useState<SortOption>('recent');

  const categories = useMemo(
    () => [...new Set(mockItems.map((item) => item.category))],
    []
  );

  const brands = useMemo(
    () => [...new Set(mockItems.map((item) => item.brand))],
    []
  );

  const filteredItems = useMemo(() => {
    let items = [...mockItems];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(query));
    }

    // Type filter
    if (typeFilter !== 'all') {
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
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return items;
  }, [search, typeFilter, categoryFilter, brandFilter, sort]);

  return (
      <div className="p-11 space-y-6">
        <CatalogHeader />
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
      </div>
  );
}