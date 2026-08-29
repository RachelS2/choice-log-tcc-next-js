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
            Navegue e gerencie todos os produtos e serviços que você registrou.
          </span>
        </div>

        <h1
          className="
      font-[family-name:var(--font-inter)]
      text-3xl
      font-semibold
      leading-tight
      tracking-[-0.02em]
      text-blue-800
      sm:text-4xl
    "
        >
          Seus{" "}
          <span className="text-blue-900/90">
            Itens
          </span>
        </h1>

      </div>
      <Button
        onClick={onNewItem}
        disabled={newItemBtnDisabled}
        className="h-11 bg-blue-600  shadow-xl hover:bg-blue-700 text-white"
      >
        <Plus className="h-4 w-4" />
        Novo item
      </Button>
    </div>
  );
}