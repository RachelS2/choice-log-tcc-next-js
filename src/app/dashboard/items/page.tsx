
import { CategoryModel, ItemResumeModel, ItemTypeEnum, PostItemModel, UpdatedItemModel } from '@/models/dashboard/items';
import { ErrorNotification } from '@/components/ui/choicelog-notification-card';
import { fetchCategoriesRepository } from '@/lib/repository/category-repository';
import { fetchItemResumeRepository, updateItemRepository, deleteItemRepository, postItemRepository } from '@/lib/repository/item-repository';
import ItemsPageClient from '@/components/dashboard/items/items-page';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export type TypeFilter = 'ALL' | ItemTypeEnum;

export default async function ItemsPage() {

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw Error("Usuário não está autorizado a acessar esta página.");
    }

    const userId = session.user.id;
    async function onEditItem(updatedItem: UpdatedItemModel): Promise<ItemResumeModel> {
      "use server";

      return await updateItemRepository(updatedItem, userId);
    }

    async function onDeleteItem(deletedItemId: string) {
      "use server";

      await deleteItemRepository(deletedItemId, userId);
    }

    async function onCreateItem(updatedItem: PostItemModel): Promise<ItemResumeModel> {
      "use server";

      return await postItemRepository(updatedItem, userId);
    }


    const categories: CategoryModel[] | null = await fetchCategoriesRepository()
    const items: ItemResumeModel[] | null = await fetchItemResumeRepository(userId);
    return (

      < ItemsPageClient onCreateItemServer={onCreateItem} onDeleteItemServer={onDeleteItem} 
      onEditItemServer={onEditItem} categories={categories} items={items} />
    );
  }
  catch {
    return (
      <ErrorNotification title="Erro no processamento de dados." description="Tente novamente mais tarde." />
    )
  }
}