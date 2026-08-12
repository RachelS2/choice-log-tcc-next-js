import { ItemDisplayModel } from '@/models/dashboard/items';
import CatalogCard from './catalog-card';

interface CatalogGridProps {
  items: ItemDisplayModel[];
  onDelete: (itemId: string) => void;

}

export default function CatalogGrid({ items, onDelete }: CatalogGridProps) {

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}