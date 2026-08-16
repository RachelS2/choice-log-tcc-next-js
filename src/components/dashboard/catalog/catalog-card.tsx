import { Pencil, Trash2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import RatingStars from '@/components/ui/rating-starts';
import { CategoryModel, ItemDisplayModel } from '@/models/dashboard/items';
import { deleteItemController } from '@/lib/controller/item-controller';
import { useState } from "react";
import Modal from '@/components/ui/modal';
import EditItemModal from '../items/edit-item/edit-item-form-modal';

export interface CatalogCardProps {
  item: ItemDisplayModel;
  onDelete: (itemId: string) => void;
  onEdit: (item: ItemDisplayModel) => void;
  categories: CategoryModel[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-violet-500 to-violet-600',
    'from-emerald-500 to-emerald-600',
    'from-amber-500 to-amber-600',
    'from-rose-500 to-rose-600',
    'from-cyan-500 to-cyan-600',
    'from-fuchsia-500 to-fuchsia-600',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
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
      className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-neutral-300"
    >
      {/* Top: Avatar + Actions */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarColor(item.friendlyName)} text-white font-semibold text-sm`}
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.friendlyName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(item.friendlyName)
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={handleEdit}
            className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-md text-neutral-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
            aria-label="Edit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-md text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Body: Name, Brand, Badges */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-950 leading-tight">
          {item.friendlyName}
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500">{item.brand}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className={`text-sm font-medium ${item.type === 'PRODUCT'
              ? 'bg-blue-50 text-blue-700 border-blue-100'
              : 'bg-violet-50 text-violet-700 border-violet-100'
              }`}
          >
            {item.type === 'PRODUCT' ? 'Product' : 'Service'}
          </Badge>
          <Badge
            variant="secondary"
            className="text-sm font-medium bg-neutral-100 text-neutral-600 border-neutral-200"
          >
            {item.category}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2.5 border-t border-neutral-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Experiences</span>
          <span className="text-sm font-medium text-neutral-900">{item.experiences}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Average rating</span>
          <div className="flex items-center gap-1.5">
            <RatingStars rating={item.averageRating} />
          </div>
        </div>
        <div className="flex items-center justify-between">

          <span className="text-sm text-neutral-500">Last consumed</span>
          <span className="text-sm font-medium text-neutral-700">
            {item.lastConsumed ? formatDate(item.lastConsumed) : '-'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-neutral-100">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-50 hover:font-bold hover:text-blue-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          View Details
        </Button>
      </div>

      <Modal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteModal}
        dialogTitle="Confirm Delete"
        dialogDescription="Are you sure you want to permanently delete this item?"
        buttonText="Delete"
      />
      <EditItemModal
        item={item}
        categories={categories}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={onEdit}
      />
    </div>
  );
}