import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryModel } from '@/models/dashboard/items';

interface CatalogHeaderProps{
  onNewItem: () => void;
  newItemBtnDisabled: boolean;
}
export default function CatalogHeader({onNewItem, newItemBtnDisabled}: CatalogHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="tracking-tight text-2xl font-bold text-blue-600">
          Catalog
        </h1>
        <p className="mt-1 text-md text-neutral-500">
          Browse and manage all the products and services you have registered.
        </p>
      </div>
      <Button
        onClick={onNewItem}
        disabled={newItemBtnDisabled}
        className="h-11 bg-blue-600  shadow-xl hover:bg-blue-700 text-white"
      >
        <Plus className="h-4 w-4" />
        New Item
      </Button>
    </div>
  );
}