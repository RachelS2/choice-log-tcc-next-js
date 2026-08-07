import { CatalogItem } from '@/app/dashboard/catalog/page';
import CatalogCard from './CatalogCard';

interface CatalogGridProps {
  items: CatalogItem[];
}

export default function CatalogGrid({ items }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} />
      ))}
    </div>
  );
}