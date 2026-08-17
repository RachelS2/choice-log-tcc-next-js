import { CategoryModel, CreateUpdateItemModel } from '@/models/dashboard/items';
import CatalogCard from './catalog-card';

interface CatalogGridProps {
  items: CreateUpdateItemModel[];
  onDelete: (itemId: string) => void;
  onEdit: (item: CreateUpdateItemModel) => void;
  categories: CategoryModel[];
}

export default function CatalogGrid({ items, onDelete, onEdit, categories }: CatalogGridProps) {

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => (
        <CatalogCard key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} categories={categories}/>
      ))}
    </div>
  );
}