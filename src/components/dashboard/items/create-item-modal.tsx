import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateUpdateItemForm, { CreateUpdateItemFormProps } from './create-update-item-form';

interface CreateUpdateItemModalProps extends CreateUpdateItemFormProps {
  open: boolean;
}

export default function CreateUpdateItemModal({ open, onOpenChange, onCreateItemServer, onEditItemServer, mode, item, categories }: CreateUpdateItemModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="bg-blue-600 rounded-lg shadow-md p-2">
            <DialogTitle className="text-xl text-center font-semibold text-white">
              {mode === "edit" ? "Editar item" : "Criar item"}
            </DialogTitle>

          </div>

        </DialogHeader>
        <CreateUpdateItemForm mode={mode} onCreateItemServer={onCreateItemServer} onEditItemServer={onEditItemServer}
          onOpenChange={onOpenChange} item={item} categories={categories} />
      </DialogContent>
    </Dialog>
  );
}