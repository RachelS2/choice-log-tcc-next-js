
"use client";
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreateItemViewDTO } from '@/models/dashboard/products';

import NewItemForm from './new-item-form';
import { useGetSystemCategories, useGetSystemProductsCategories, useGetUserProductsCategories, useGetUserServicesCategories } from '@/hooks/use-categories';

interface NewItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (product: CreateItemViewDTO) => void;
  itemType: "product" | "service";
}

export default function NewItemModal({
  open,
  onOpenChange,
  onCreate,
  itemType,
}: NewItemModalProps) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    imageUrl: "",
  });

  const reset = () => {
    setForm({
      name: "",
      brand: "",
      category: "",
      imageUrl: "",
    });
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.brand.trim() || !form.category) return;

    const item: CreateItemViewDTO = {
      friendlyName: form.name,
      brand: form.brand.trim(),
      categoryId: form.category,
      imageUrl: form.imageUrl.trim() || null,
    };

    onCreate(item);
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  // hooks sempre no topo (sem condição)
  const userProductCategories = useGetUserProductsCategories().data ?? [];
  const systemProductCategories = useGetSystemProductsCategories().data ?? [];

  const userServiceCategories = useGetUserServicesCategories().data ?? [];
  const systemServiceCategories = useGetSystemCategories().data ?? [];

  const categories =
    itemType === "product"
      ? [...userProductCategories, ...systemProductCategories]
      : [...userServiceCategories, ...systemServiceCategories];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new {itemType}</DialogTitle>
          <DialogDescription>
            Add a {itemType} to your catalog.
          </DialogDescription>
        </DialogHeader>

        <NewItemForm
          value={form}
          categories={categories}
          onChange={(field, value) =>
            setForm((prev) => ({ ...prev, [field]: value }))
          }
          onSubmit={handleSubmit}
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={
              !form.name.trim() ||
              !form.brand.trim() ||
              !form.category
            }
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Add {itemType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}