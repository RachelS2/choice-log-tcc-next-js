import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, PageSubtitle, PageTitle } from '@/components/ui/choicelog-pages-title';
import { Card } from '@/components/ui/card';

interface CatalogHeaderProps {
  onNewItem: () => void;
  newItemBtnDisabled: boolean;
}
export default function CatalogHeader({ onNewItem, newItemBtnDisabled }: CatalogHeaderProps) {
  return (

    <Card className="flex flex-col p-4 sm:p-4 items-start text-left">
      <div className="flex  w-full flex-col gap-2 lg:w-auto lg:min-w-[420px]">

        <PageHeader
          header="Produtos e Serviços Registrados"
          className="justify-start"
          lineBefore
          lineAfter={false}
        />

        <PageTitle
          title="Seus Itens"
          className="justify-start"
        />

        <PageSubtitle
          subtitle="Navegue e gerencie todos os produtos e serviços que você registrou."
          className="justify-start"
        />
      </div>
    </Card>
  );
}
