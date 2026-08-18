import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateUpdateItemForm from './create-update-item-form';
import type { CategoryModel, CreateUpdateItemModel } from '../../../models/dashboard/items';

interface CreateUpdateItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (item: CreateUpdateItemModel) => void;
  mode: "create" | "edit";
  item?: CreateUpdateItemModel;
  categories: CategoryModel[];
}

export default function CreateUpdateItemModal({ open, onOpenChange, onSuccess, mode, item, categories }: CreateUpdateItemModalProps) {
  const handleSuccess = (item: CreateUpdateItemModel) => {
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
          <div className="bg-blue-600 rounded-lg shadow-md p-2">
            <DialogTitle className="text-xl text-center font-semibold text-white">
              {mode === "edit" ? "Edit Item" : "Create Item"}
            </DialogTitle>

          </div>

        </DialogHeader>
        <CreateUpdateItemForm mode={mode} onSuccess={handleSuccess} onCancel={handleCancel} item={item} categories={categories} />
      </DialogContent>
    </Dialog>
  );
}