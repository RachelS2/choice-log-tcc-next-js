import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryModel } from '@/models/dashboard/items';
import { PageHeader, PageTitle } from '@/components/ui/pages-title';

interface CatalogHeaderProps {
  onNewItem: () => void;
  newItemBtnDisabled: boolean;
}
export default function CatalogHeader({ onNewItem, newItemBtnDisabled }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col gap-2 mx-auto w-full max-w-7xl sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col">
          <PageHeader header="Navegue e gerencie todos os produtos e serviços que você registrou." lineBefore/>
          
          <PageTitle title="Seus Itens" />

      </div>
      <Button
        onClick={onNewItem}
        disabled={newItemBtnDisabled}
        className="h-11 bg-blue-900/90 hover:bg-blue-700 text-white"
      >
        <Plus className="h-4 w-4" />
        Novo item
      </Button>
    </div>
  );
}