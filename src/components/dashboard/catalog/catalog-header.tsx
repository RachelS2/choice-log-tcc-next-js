import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryModel } from '@/models/dashboard/items';

interface CatalogHeaderProps {
  onNewItem: () => void;
  newItemBtnDisabled: boolean;
}
export default function CatalogHeader({ onNewItem, newItemBtnDisabled }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="h-px w-6 bg-blue-900/70" />

          <span className="text-[10px] font-semibold tracking-[0.22em] text-blue-900 uppercase">
           Browse and manage all the products and services you have registered.
          </span>
        </div>

        <h1
          className="
      font-[family-name:var(--font-inter)]
      text-3xl
      font-semibold
      leading-[0.95]
      tracking-[-0.03em]
      text-blue-700
      [text-shadow:0_6px_18px_rgba(30,64,175,0.16)]
      sm:text-4xl
    "
        >
          Your Items
        </h1>

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