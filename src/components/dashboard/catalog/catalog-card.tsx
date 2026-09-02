import { Pencil, Trash2, Star, Wrench, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RatingStars } from '@/components/ui/rating-starts';
import { CategoryModel, CreateUpdateItemModel } from '@/models/dashboard/items';
import { deleteItemController } from '@/lib/controller/item-controller';
import { ReactNode, useState } from "react";
import Modal from '@/components/ui/modal';
import CreateUpdateItemModal from '../items/create-item-modal';
import { getAvatarColor, getInitials, formatDate, cn, formatDatetime } from '@/lib/utils';
import { ItemHero } from '@/components/ui/item-hero';

export interface CatalogCardProps {
  item: CreateUpdateItemModel;
  onDelete: (itemId: string) => void;
  onEdit: (item: CreateUpdateItemModel) => void;
  categories: CategoryModel[];
}

export default function CatalogCard({ item, onDelete, onEdit, categories }: CatalogCardProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] =
    useState(false);
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModalOpen(true);
  };
  async function handleDeleteModal() {
    try {
      await deleteItemController(item.id);

      setDeleteModalOpen(false);

      onDelete(item.id);
      toast.success("Item excluído com sucesso.");
    } catch (error) {
      console.error("Falha ao excluir item:", error);
      toast.error("Falha ao excluir item.");
    }
  }
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  const handleViewDetails = () => {
    console.log("Marca" + item.brand);
    toast.info(`Detalhes de "${item.friendlyName}" em breve!`);
  };

  return (
    <div
      className="
    group relative flex h-full cursor-pointer flex-col
    overflow-hidden rounded-2xl
    border border-neutral-200
    bg-white
    shadow-sm
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:border-blue-900
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
              disabled={categories.length === 0}
              onClick={handleEdit}
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
              onClick={handleDelete}
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
            ? formatDate(item.lastConsumed)
            : "-"} />

          <ItemStats title="Atualizado em" data={formatDatetime(item.updatedAt.toString())} />
          {/* <ItemStats
          title="Avaliação média"
          data={
            item.averageRating > 0 ? (
              <div className="flex items-center gap-1.5">
                <RatingStars
                  value={item.averageRating}
                  size="sm"
                />
              </div>
            ) : (
              <span className="text-sm text-neutral-700">
                -
              </span>
            )
          }
        /> */}

        </div>

        {/* Footer */}
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            className="
          w-full
          rounded-lg
          font-medium
          text-blue-900/90

          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-blue-900
          hover:bg-blue-900/90
          cursor-pointer
          hover:text-white
          bg-white
          hover:shadow-md
          active:translate-y-0
        "
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteModal}
        dialogTitle="Confirm Delete"
        dialogDescription="Tem certeza que deseja excluir este item permanentemente?"
        buttonText="Excluir"
      />

      <CreateUpdateItemModal
        item={item}
        categories={categories}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={onEdit}
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