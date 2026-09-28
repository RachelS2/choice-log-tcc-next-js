import { CategoryModel, CreateUpdateItemModel } from '@/models/dashboard/items';
import ItemsCard from './item-card';

interface ItemsGridProps {
  items: CreateUpdateItemModel[];
  onDelete: (itemId: string) => void;
  onEdit: (item: CreateUpdateItemModel) => void;
  categories: CategoryModel[];
}

export default function ItemsGrid({
  items,
  onDelete,
  onEdit,
  categories,
}: ItemsGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
      {items.map((item) => (
        <ItemsCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          categories={categories}
        />
      ))}
    </div>
  );
}