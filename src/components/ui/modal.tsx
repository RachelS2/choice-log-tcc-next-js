"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  dialogTitle: string;
  dialogDescription: string;
  buttonText: string;
}

export default function Modal({
  open,
  onOpenChange,
  onConfirm,
  dialogTitle,
  dialogDescription, buttonText
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>

          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button
            className="hover:bg-gray-200 hover:text-gray-900"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}