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
import { cn, toSystemName } from '@/lib/utils';
import { itemFormSchema, type ItemFormSchema } from '../../../../zod-schemas/item-form-schema';
import type { CategoryModel, ItemModel, ItemTypeEnum } from '../../../../models/dashboard/items';
import { getCategories } from '@/app/api/category/route';
import { postItem } from '@/lib/controller/item';

interface ItemFormProps {
  onSuccess: (item: ItemModel) => void;
  onCancel: () => void;
}

export default function ItemForm({ onSuccess, onCancel }: ItemFormProps) {

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<ItemFormSchema>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      type: undefined,
      categoryId: '',
      friendlyName: '',
      brand: '',
      imageUrl: '',
    },
  });

  const selectedType = watch('type');
  const friendlyName = watch('friendlyName');

  // Load categories when type changes
  const loadCategories = useCallback(async (type: ItemTypeEnum) => {
    setLoadingCategories(true);
    try {
      const cats = await getCategories(type);
      setCategories(cats);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    if (selectedType) {
      loadCategories(selectedType);
      setValue('categoryId', '');
    }
  }, [selectedType, loadCategories, setValue]);

  const onSubmit = async (data: ItemFormSchema) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const item = await postItem({
        categoryId: data.categoryId,
        friendlyName: data.friendlyName,
        systemName: toSystemName(friendlyName),
        brand: data.brand,
        imageUrl: data.imageUrl || undefined,
      });
      onSuccess(item);
    } catch (err) {
      if (err instanceof Error && err.message === 'UNIQUE_CONSTRAINT_VIOLATION') {
        setServerError('You already have an item with this name and brand.');
        setError('friendlyName', { message: 'Duplicate combination.' });
        setError('brand', { message: 'Duplicate combination.' });
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
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
        <Label className="text-sm font-medium text-neutral-700">
          Item Type <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setValue('type', 'PRODUCT');
              clearErrors('type');
            }}
            className={cn(
              'flex flex-col items-center cursor-pointer gap-2 rounded-xl border-2 p-4 transition-all',
              selectedType === 'PRODUCT'
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
            )}
          >
            <Package className="h-6 w-6" />
            <span className="text-sm font-medium">Product</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('type', 'SERVICE');
              clearErrors('type');
            }}
            className={cn(
              'flex flex-col items-center gap-2 cursor-pointer  rounded-xl border-2 p-4 transition-all',
              selectedType === 'SERVICE'
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
            )}
          >
            <Wrench className="h-6 w-6" />
            <span className="text-sm font-medium">Service</span>
          </button>
        </div>
        {errors.type && (
          <p className="text-xs text-red-600 mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="categoryId" className="text-sm font-medium text-neutral-700">
          Category <span className="text-red-500">*</span>
        </Label>
        {!selectedType ? (
          <p className="text-xs text-neutral-400 italic">
            Select an item type first to see available categories.
          </p>
        ) : loadingCategories ? (
          <div className="flex items-center gap-2 text-sm text-neutral-500 py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading categories...
          </div>
        ) : (
          <Select
            value={watch('categoryId')}
            onValueChange={(value) => {
              setValue('categoryId', value);
              clearErrors('categoryId');
            }}
          >
            <SelectTrigger id="categoryId" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent position="popper">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.categoryId && (
          <p className="text-xs text-red-600 mt-1">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Friendly Name */}
      <div className="space-y-2">
        <Label htmlFor="friendlyName" className="text-sm font-medium text-neutral-700">
          {!selectedType ? ('Item Name') : selectedType[0].toUpperCase() + selectedType.slice(1).toLowerCase()}  <span className="text-red-500">*</span>
        </Label>
        <Input
          id="friendlyName"
          placeholder="e.g. Moisturizing Shampoo"
          maxLength={30}
          {...register('friendlyName')}
        />
        <div className="flex items-center justify-between">
          {errors.friendlyName ? (
            <p className="text-xs text-red-600">{errors.friendlyName.message}</p>
          ) : (
            <p className="text-xs text-neutral-400">
              The name you use to identify this item.
            </p>
          )}
          <span className="text-xs text-neutral-400">
            {(friendlyName || '').length}/30
          </span>
        </div>
      </div>


      {/* Brand / Provider */}
      <div className="space-y-2">
        <Label htmlFor="brand" className="text-sm font-medium text-neutral-700">
          {selectedType === 'SERVICE' ? 'Provider' : 'Brand'}{' '}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="brand"
          placeholder={
            selectedType === 'SERVICE'
              ? 'e.g. Studio Bella, Uber'
              : 'e.g. Nike, Samsung, Dove'
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
                ? 'The company or professional providing the service.'
                : 'The brand that makes this product.'}
            </p>
          )}
          <span className="text-xs text-neutral-400">
            {(watch('brand') || '').length}/30
          </span>
        </div>
      </div>

      {/* Image URL (optional)
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-sm font-medium text-neutral-700">
          Image URL{' '}
          <span className="text-xs font-normal text-neutral-400">(optional)</span>
        </Label>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            id="imageUrl"
            placeholder="https://example.com/image.jpg"
            className="pl-9"
            {...register('imageUrl')}
          />
        </div>
        {errors.imageUrl && (
          <p className="text-xs text-red-600 mt-1">{errors.imageUrl.message}</p>
        )}
      </div> */}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 pb-3 border-t border-neutral-100">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
          className="border-neutral-300  h-10 hover:text-neutral-900 text-neutral-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white h-10 hover:bg-blue-700 min-w-[120px]"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </span>
          ) : (
            'Add Item'
          )}
        </Button>
      </div>
    </form>
  );
}
