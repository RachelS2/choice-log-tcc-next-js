import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateUpdateItemForm from './create-update-item-form';
import type { ItemDisplayModel, ItemModel } from '../../../models/dashboard/items';

interface CreateUpdateItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (item: ItemDisplayModel) => void;
  mode: "create" | "edit";
  item?: ItemDisplayModel;
}

export default function CreateUpdateItemModal({ open, onOpenChange, onSuccess, mode, item }: CreateUpdateItemModalProps) {
  const handleSuccess = (item: ItemDisplayModel) => {
    onSuccess(item);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-blue-500">
            {mode === "edit" ? "Edit Item" : "Create Item"}
          </DialogTitle>
          <DialogDescription className="text-md text-neutral-500">
            {mode === "edit" ? "Update the details of this item." : "Add a new item to your inventory."}
          </DialogDescription>
        </DialogHeader>
        <CreateUpdateItemForm mode={mode} onSuccess={handleSuccess} onCancel={handleCancel} item={item} />
      </DialogContent>
    </Dialog>
  );
}