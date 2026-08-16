"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
  ItemDisplayModel,
  ItemTypeEnum,
  CategoryModel,
} from "@/models/dashboard/items";


import { toast } from "sonner";
import { updateItemController } from "@/lib/controller/item-controller";

interface EditItemFormData {
  friendlyName: string;
  brand: string;
  type: ItemTypeEnum;
  categoryId: string;
}

interface EditItemModalProps {
  item: ItemDisplayModel;
  categories: CategoryModel[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (item: ItemDisplayModel) => void;
}

export default function EditItemModal({
  item,
  categories,
  open,
  onOpenChange,
  onSuccess,
}: EditItemModalProps) {

  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<EditItemFormData>({
    defaultValues: {
      friendlyName: item.friendlyName,
      brand: item.brand,
      type: item.type,
      categoryId: item.categoryId,
    },
  });

  const selectedType = watch("type");
  const selectedCategory = watch("categoryId");

  useEffect(() => {
    if (open) {
      reset({
        friendlyName: item.friendlyName,
        brand: item.brand,
        type: item.type,
        categoryId: item.categoryId,
      });
    }
  }, [open, item, reset]);
  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) => category.type === selectedType
    );
  }, [categories, selectedType]);
  useEffect(() => {
    const categoryStillValid = filteredCategories.some(
      (category) => category.id === selectedCategory
    );

    if (!categoryStillValid && filteredCategories.length > 0) {
      setValue(
        "categoryId",
        filteredCategories[0].id
      );
    }
  }, [
    filteredCategories,
    selectedCategory,
    setValue,
  ]);
  async function onSubmit(data: EditItemFormData) {
    try {
      setSaving(true);

      const updatedItem = await updateItemController({
        id: item.id,
        friendlyName: data.friendlyName,
        brand: data.brand,
        categoryId: data.categoryId,
      });

      onSuccess(updatedItem);

      toast.success("Item updated successfully.");

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update item:", error);

      toast.error("Failed to update item.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>

          <DialogDescription>
            Update the information about this item.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Name
            </label>

            <Input
              {...register("friendlyName", {
                required: true,
              })}
              placeholder="Item name"
            />
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Brand
            </label>

            <Input
              {...register("brand", {
                required: true,
              })}
              placeholder="Brand"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Type
            </label>

            <Select
              value={selectedType}
              onValueChange={(value) =>
                setValue(
                  "type",
                  value as ItemTypeEnum
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="PRODUCT">
                  Product
                </SelectItem>

                <SelectItem value="SERVICE">
                  Service
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Category
            </label>

            <Select
              value={selectedCategory}
              onValueChange={(value) =>
                setValue("categoryId", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {filteredCategories.map(
                  (category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}