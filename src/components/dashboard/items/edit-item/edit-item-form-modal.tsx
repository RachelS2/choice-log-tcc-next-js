import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ItemForm from './edit-item-form';
import type { ItemModel } from '../../../../models/dashboard/items';

interface EditItemFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (item: ItemModel) => void;
}

export default function EditItemFormModal({ open, onOpenChange, onSuccess }: EditItemFormModalProps) {
  const handleSuccess = (item: ItemModel) => {
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
          <DialogTitle className="text-xl font-semibold text-neutral-950">
            New Item
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            Register a product or service to use in your consumption records.
          </DialogDescription>
        </DialogHeader>
        <ItemForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}