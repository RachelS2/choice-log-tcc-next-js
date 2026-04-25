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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Product } from './ProductSelector';

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (product: Product) => void;
}

const CATEGORIES = [
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Beauty',
  'Sports',
  'Books',
  'Food & Drink',
  'Other',
];

export default function AddProductModal({ open, onOpenChange, onCreate }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const reset = () => {
    setName('');
    setBrand('');
    setCategory('');
    setImageUrl('');
  };

  const handleSubmit = () => {
    if (!name.trim() || !brand.trim() || !category) return;
    const product: Product = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      category,
      imageUrl: imageUrl.trim() || undefined,
    };
    onCreate(product);
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
          <DialogDescription>
            Add a product to your catalog. It will be instantly available for selection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product name</Label>
            <Input
              id="product-name"
              placeholder="e.g. AirPods Pro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-brand">Brand</Label>
            <Input
              id="product-brand"
              placeholder="e.g. Apple"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="product-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-image">Image URL (optional)</Label>
            <Input
              id="product-image"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="!bg-transparent hover:!bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !brand.trim() || !category}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Add product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}