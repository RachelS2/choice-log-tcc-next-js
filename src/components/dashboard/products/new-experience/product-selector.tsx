import { useState } from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl?: string;
}

interface ProductSelectorProps {
  products: Product[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
}

export default function ProductSelector({
  products,
  selectedId,
  onSelect,
  onAddNew,
}: ProductSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = products.find((p) => p.id === selectedId);

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-1 justify-between bg-white font-normal"
          >
            {selected ? (
              <span className="flex items-center gap-2 truncate">
                <span className="font-medium text-gray-900">{selected.name}</span>
                <span className="text-gray-500 text-xs">· {selected.brand}</span>
              </span>
            ) : (
              <span className="text-gray-500">Search and select a product...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search products..." />
            <CommandList>
              <CommandEmpty>No product found.</CommandEmpty>
              <CommandGroup>
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={`${product.name} ${product.brand}`}
                    onSelect={() => {
                      onSelect(product.id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-gray-500">
                        {product.brand} · {product.category}
                      </span>
                    </div>
                    <Check
                      className={cn(
                        'h-4 w-4',
                        selectedId === product.id ? 'opacity-100 text-blue-600' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        onClick={onAddNew}
        className="bg-blue-600 text-white hover:bg-blue-700 shrink-0"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add new
      </Button>
    </div>
  );
}