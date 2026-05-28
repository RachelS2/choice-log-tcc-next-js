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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useGetUserProducts } from '@/hooks/use-products';
import { toast } from 'sonner';


interface ProductSelectorProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function ProductSelector({
    selectedId,
    onSelect,
}: ProductSelectorProps) {
    const [onOpen, setOpen] = useState(false);
    const { products, error, loading } = useGetUserProducts();
    const [addModalOpen, setAddModalOpen] = useState(false);

    if (error && !loading) {
        toast.error("Failed to load products.", {description: error.message});
        return
    }

    const selected = products.find((p) => p.id === selectedId);
    return (
        <>
            <Card>
                <CardHeader>
                    <CardDescription>Select an existing product or add a new one to your catalog.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="flex gap-2">
                        <Popover open={onOpen} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={onOpen}
                                    className="flex-1 justify-between bg-white font-normal"
                                >
                                    {selected ? (
                                        <span className="flex items-center gap-2 truncate">
                                            <span className="font-medium text-gray-900">{selected.friendlyName}</span>
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
                                                    value={`${product.friendlyName} ${product.brand}`}
                                                    onSelect={() => {
                                                        onSelect(product.id);
                                                        setOpen(false);
                                                    }}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-black">{product.friendlyName}</span>
                                                        <span className="text-xs text-gray-600">
                                                            {product.brand} · {product.categoryId}
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
                            onClick={() => setAddModalOpen(true)}
                            className="bg-blue-600 text-white hover:bg-blue-700 shrink-0"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add new
                        </Button>
                    </div>

                </CardContent>
            </Card>

        </>
    );
}