import { Pencil, Trash2, Star, Wrench, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CategoryModel, ItemResumeModel, UpdatedItemModel } from '@/models/dashboard/items';
import { ReactNode, useState } from "react";
import Modal from '@/components/ui/choicelog-modal';
import CreateUpdateItemModal from './create-item-modal';
import { formatDate, formatDateTime, } from '@/lib/utils';
import { ItemHero } from '@/components/ui/choicelog-item-hero';
import { redirect } from 'next/navigation';

export interface ItemsCardProps {
  item?: ItemResumeModel;
  onDelete: (itemId: string) => void;
  onEdit: (
    item: UpdatedItemModel
  ) => Promise<ItemResumeModel>;
  categories: CategoryModel[];
}

export default function ItemsCard({ item, onDelete, onEdit, categories }: ItemsCardProps) {
  if (item == undefined) {
    return
  }
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModalOpen(true);
  };
  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  async function onEditItem(itemToEdit: UpdatedItemModel): Promise<ItemResumeModel | null> {
    if (itemToEdit == undefined) throw Error("Item shouldnt be undefined at the edition moment!");

    try {
      const itemResume = await onEdit(itemToEdit);
      toast.success("Item editado com sucesso.");
      setLoading(false);

      return itemResume;
    } catch (error) {
      toast.error("Falha ao editar item.");
      return null;
    }
  }

  async function onDeleteItem() {
    if (item == undefined) throw Error("Item shouldnt be undefined at the delete moment!");

    setLoading(true);

    try {
      onDelete(item.id);
      toast.success("Item excluído com sucesso.");
    } catch (error) {
      toast.error("Falha ao excluir item.");
    }
    setLoading(false);
  }


  const handleViewDetails = () => {
    redirect("/dashboard/experiences")
  };

  return (
    <div
      className="
    group relative flex h-full flex-col
    overflow-hidden rounded-2xl
    border border-neutral-200
    bg-white
    shadow-md
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:shadow-blue-900
    hover:shadow-lg hover:shadow-blue-100/0
  "
    >
      <div className="flex h-full flex-col p-5">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <ItemHero item={item} />
          {/* Actions */}
          <div
            className="
        flex shrink-0 items-center gap-1
        opacity-0
        transition-all duration-200
        group-hover:opacity-100
      "
          >
            <button
              disabled={loading}
              onClick={handleEditButtonClick}
              className="
          flex h-8 w-8 cursor-pointer items-center justify-center
          rounded-lg
          text-neutral-400
          transition-all
          hover:bg-blue-50
          hover:text-blue-600
          hover:shadow-sm
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
              aria-label="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>

            <button
              disabled={loading}
              onClick={handleDeleteButtonClick}
              className="
          flex h-8 w-8 cursor-pointer items-center justify-center
          rounded-lg
          text-neutral-400
          transition-all
          hover:bg-red-50
          hover:text-red-600
          hover:shadow-sm
        "
              aria-label="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>


        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-neutral-200" />

        {/* Stats */}
        <div className="flex-1 space-y-3">
          <ItemStats title="Experiências" data={item.experiences.toString()} />

          <ItemStats title="Total gasto" data={"R$ " + item.totalSpent.toFixed(2)} />

          <ItemStats title="Último consumo" data={item.lastConsumed
            ? formatDate(new Date(item.lastConsumed))
            : "-"} />

          <ItemStats title="Atualizado em" data={formatDateTime(item.updatedAt)} />

        </div>

        {/* Footer */}
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="
          w-full
          rounded-lg
          font-semibold
          text-white
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-blue-900
          hover:bg-blue-900/90
          cursor-pointer
          hover:text-white
          bg-blue-900
          border-none
          shadow-none
          hover:shadow-md
          active:translate-y-0
        "
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            Ver Experiências
          </Button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={onDeleteItem}
        dialogTitle="Confirmar Exclusão"
        dialogDescription="Tem certeza que deseja excluir este item permanentemente?"
        buttonText="Excluir"
      />

      <CreateUpdateItemModal
        item={item}
        categories={categories}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onEditItemServer={onEditItem}
        onCreateItemServer={null}
        mode="edit"
      />

    </div >
  );
}


function ItemStats({ title, data }: { title: string; data: string | ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-blue-950">
        {title}
      </span>

      <span className="text-sm text-neutral-600">
        {data}
      </span>
    </div>)

}