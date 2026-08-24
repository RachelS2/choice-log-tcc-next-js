import { Pencil, Trash2, Star, Wrench, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RatingStars } from '@/components/ui/rating-starts';
import { CategoryModel, CreateUpdateItemModel } from '@/models/dashboard/items';
import { deleteItemController } from '@/lib/controller/item-controller';
import { useState } from "react";
import Modal from '@/components/ui/modal';
import CreateUpdateItemModal from '../items/create-item-modal';
import { getAvatarColor, getInitials, formatDate, cn } from '@/lib/utils';

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
      toast.success("Item deleted successfully.");
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item.");
    }
  }
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  const handleViewDetails = () => {
    toast.info(`Details for "${item.friendlyName}" coming soon!`);
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
    hover:border-blue-200
    hover:shadow-lg hover:shadow-blue-100/50
  "
    >

      <div className="flex h-full flex-col p-5">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center",
                "overflow-hidden rounded-full",
                "border-2 border-white shadow-md",
                "bg-gradient-to-br",
                getAvatarColor(item.friendlyName),
                "text-sm font-semibold text-white"
              )}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.friendlyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(item.friendlyName)
              )}
            </div>

            {/* Name */}
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold leading-tight text-neutral-900">
                {item.friendlyName}
              </h3>

              <p className="mt-1 truncate text-sm text-neutral-500">
                {item.brand}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div
            className="
          flex items-center gap-1
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

        {/* Badges */}
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full",
              "border px-2.5 py-1",
              "text-xs font-semibold shadow-none",
              "bg-white",
              item.type === "SERVICE"
                ? "border-blue-200 text-blue-500"
                : "border-blue-300 text-blue-600"
            )}
          >
            {item.type === "SERVICE" ? (
              <Wrench className="size-3.5" />
            ) : (
              <Package className="size-3.5" />
            )}

            {item.type === "PRODUCT" ? "Product" : "Service"}
          </Badge>

          <Badge
            variant="secondary"
            className="
          rounded-full
          border border-neutral-200
          bg-neutral-50
          px-2.5 py-1
          text-xs font-medium
          text-neutral-500
          shadow-none
        "
          >
            {item.categoryName}
          </Badge>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-neutral-100" />

        {/* Stats */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Experiences
            </span>

            <span className="text-sm font-semibold text-neutral-700">
              {item.experiences}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Total Spent
            </span>

            <span className="text-sm font-semibold text-neutral-700">
              $ {item.totalSpent.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Last consumed
            </span>

            <span className="text-sm font-medium text-neutral-700">
              {item.lastConsumed
                ? formatDate(item.lastConsumed)
                : "-"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Average rating
            </span>

            {item.averageRating > 0 ? (
              <div className="flex items-center gap-1.5">
                <RatingStars
                  value={item.averageRating}
                  size="sm"
                />

                <span className="text-xs font-semibold text-neutral-600">
                  {item.averageRating.toFixed(1)}
                </span>
              </div>
            ) : (
              <span className="text-sm text-neutral-400">
                -
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="
          w-full
          rounded-lg
          border-blue-200
          bg-blue-50
          font-medium
          text-blue-600
          shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5
          hover:border-blue-300
          hover:bg-blue-100
          hover:text-blue-700
          hover:shadow-md
          active:translate-y-0
        "
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteModal}
        dialogTitle="Confirm Delete"
        dialogDescription="Are you sure you want to permanently delete this item?"
        buttonText="Delete"
      />

      <CreateUpdateItemModal
        item={item}
        categories={categories}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={onEdit}
        mode="edit"
      />
      {/* Accent divider */}
      <div className="h-1 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />
    </div>
  );
}