"use client";
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package, Wrench, Loader2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, formatItemTypeLabel, toSystemName } from '@/lib/utils';
import type { CategoryModel, CreateUpdateItemModel, ItemTypeEnum } from '../../../models/dashboard/items';
import { fetchCategoriesController } from '@/lib/controller/category-controller';
import { postItemController, updateItemController } from '@/lib/controller/item-controller';
import { itemFormSchema, ItemFormSchema } from '@/zod-schemas/item-form-schema';
import { stringify } from 'querystring';

interface CreateUpdateItemFormProps {
  mode: "create" | "edit";

  item?: CreateUpdateItemModel;

  onSuccess: (item: CreateUpdateItemModel) => void;

  onCancel: () => void;
  categories: CategoryModel[];

}

export default function CreateUpdateItemForm({ onSuccess, onCancel, item, mode, categories }: CreateUpdateItemFormProps) {

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
    clearErrors,
    setError,
  } = useForm<ItemFormSchema>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      type: item?.type,
      friendlyName: item?.friendlyName ?? "",
      brand: item?.brand ?? "",
      imageUrl: item?.imageUrl ?? "",
      categoryId: item?.categoryId ?? "",
    },
  });

  const selectedType = watch('type');
  const friendlyName = watch('friendlyName');

  const categoryValue = watch("categoryId");

  const filteredCategories = categories.filter(
    (category) => category.type === selectedType
  );

  useEffect(() => {
    if (item) {
      reset({
        type: item.type,
        categoryId: item.categoryId,
        friendlyName: item.friendlyName,
        brand: item.brand,
        imageUrl: item.imageUrl ?? "",
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: ItemFormSchema) => {

    console.log(data)
    setSubmitting(true);
    setServerError(null);

    try {
      let createdUpdatedItem: CreateUpdateItemModel;

      if (mode === "create") {
        createdUpdatedItem = await postItemController({
          categoryId: data.categoryId,
          friendlyName: data.friendlyName,
          systemName: toSystemName(data.friendlyName),
          brand: data.brand,
          imageUrl: data.imageUrl || null,
        });
      } else {
        if (!item) {
          throw new Error("Dados do item ausentes para edição.");
        }
        createdUpdatedItem = await updateItemController({
          id: item.id,
          categoryId: data.categoryId,
          friendlyName: data.friendlyName,
          brand: data.brand,
        });
      }

      onSuccess(createdUpdatedItem);
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === "UNIQUE_CONSTRAINT_VIOLATION"
      ) {
        setServerError(
          "Você já possui um item com este nome e marca."
        );

        setError("friendlyName", {
          message: "Combinação duplicada.",
        });

        setError("brand", {
          message: "Combinação duplicada.",
        });
      } else {
        setServerError(
          "Ocorreu um erro inesperado. Tente novamente."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleTypeChange = (type: ItemTypeEnum) => {
    setValue("type", type, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("categoryId", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    clearErrors(["type", "categoryId"]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-5">
      {/* Server Error */}
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Item Type Selection */}
      <div className="space-y-2">
        <Label className="text-md text-neutral-700">
          Tipo do item<span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <ItemTypeButton
            type="PRODUCT"
            selectedType={selectedType}
            onSelect={handleTypeChange}
          />

          <ItemTypeButton
            type="SERVICE"
            selectedType={selectedType}
            onSelect={handleTypeChange}
          />
        </div>
        {errors.type && (
          <p className="text-xs text-red-600 mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="categoryId" className="text-md text-neutral-700">
          Categoria <span className="text-red-500">*</span>
        </Label>
        {!selectedType ? (
          <p className="text-xs text-neutral-400 italic">
            Selecione primeiro o tipo do item para ver as categorias disponíveis.
          </p>
        ) : (
          <Select
            value={categoryValue}
            onValueChange={(value) => {
              setValue("categoryId", value, {
                shouldValidate: true,
                shouldDirty: true,
              });

              clearErrors("categoryId");
            }}
          >
            <SelectTrigger id="categoryId" className="w-full">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>

            <SelectContent position="popper">
              {filteredCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.categoryId && (
          <p className="text-xs text-red-600 mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Friendly Name */}
      <div className="space-y-2">
        <Label htmlFor="friendlyName" className="text-md text-neutral-700">
          {!selectedType ? ('Nome do item') : formatItemTypeLabel(selectedType)}  <span className="text-red-500">*</span>
        </Label>
        <Input
          id="friendlyName"
          placeholder={selectedType == "SERVICE" ? ("ex.: Esteticista") : "ex.: Shampoo hidratante"}
          maxLength={30}
          {...register('friendlyName')}
        />
        <div className="flex items-center justify-between">
          {errors.friendlyName ? (
            <p className="text-xs text-red-600">{errors.friendlyName.message}</p>
          ) : (
            <p className="text-xs text-neutral-400">
              O nome que você usa para identificar este item.
            </p>
          )}
          <span className="text-xs text-neutral-400">
            {(friendlyName || '').length}/30
          </span>
        </div>
      </div>


      {/* Brand / Provider */}
      <div className="space-y-2">
        <Label htmlFor="brand" className="text-md text-neutral-700">
          {selectedType === 'SERVICE' ? 'Prestador' : 'Marca'}{' '}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="brand"
          placeholder={
            selectedType === 'SERVICE'
              ? 'ex.: Studio Bella, Uber'
              : 'ex.: Nike, Samsung, Dove'
          }
          maxLength={30}
          {...register('brand')}
        />
        <div className="flex items-center justify-between">
          {errors.brand ? (
            <p className="text-xs text-red-600">{errors.brand.message}</p>
          ) : (
            <p className="text-xs text-neutral-400">
              {selectedType === 'SERVICE'
                ? 'A empresa ou profissional que presta o serviço.'
                : 'A marca que produz este item.'}
            </p>
          )}
          <span className="text-xs text-neutral-400">
            {(watch('brand') || '').length}/30
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 pb-3 border-t border-neutral-100">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={submitting}
          className="w-24 h-10 text-red-500 bg-white/80 shadow-md hover:text-red-600"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!isDirty || submitting}
          className="bg-blue-600 text-white h-10 hover:bg-blue-700 min-w-[120px]"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />

              {mode === "edit"
                ? "Salvando..."
                : "Adicionando..."}
            </span>
          ) : (
            mode === "edit"
              ? "Salvar alterações"
              : "Adicionar item"
          )}
        </Button>
      </div>
    </form>
  );
}


interface ItemTypeButtonProps {
  type: ItemTypeEnum;
  selectedType: ItemTypeEnum | undefined;
  onSelect: (type: ItemTypeEnum) => void;
}

function ItemTypeButton({
  type,
  selectedType,
  onSelect,
}: ItemTypeButtonProps) {
  const isSelected = selectedType === type;

  const isProduct = type === "PRODUCT";

  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={cn(
        "flex flex-col items-center gap-2 cursor-pointer rounded-xl border-2 p-4 transition-all",
        isSelected
          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
      )}
    >
      {isProduct ? (
        <Package className="h-6 w-6" />
      ) : (
        <Wrench className="h-6 w-6" />
      )}

      <span className="text-md font-medium">
        {isProduct ? "Product" : "Service"}
      </span>
    </button>
  );
}