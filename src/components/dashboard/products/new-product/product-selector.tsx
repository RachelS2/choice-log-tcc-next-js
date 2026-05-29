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
import { AddNewExperienceFormModel } from '@/models/dashboard/experiences';
import { Input } from '@/components/ui/input';


interface ProductSelectorProps {
    selectedId: string | null;
    updateField: <K extends keyof AddNewExperienceFormModel>(field: K, value: AddNewExperienceFormModel[K]) => void;
}

export default function ProductSelector({
    selectedId,
    updateField,
}: ProductSelectorProps) {
    const [onOpen, setOpen] = useState(false);
    const { data, error, loading } = useGetUserProducts();
    if (error && !loading) {
        toast.error("Failed to load products.", { description: error.message });
        return
    }
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const filteredProducts = data?.filter((product) =>
        `${product.friendlyName} ${product.brand}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const selected = data?.find((p) => p.id === selectedId);
    return (
        <div className="flex gap-1">
            <div className="relative flex-1">
                <Input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => {
                        setTimeout(() => setOpen(false), 150);
                    }}
                    placeholder="Search and select a product..."
                    className="pr-10 h-11"
                />

                <ChevronsUpDown
                    className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            h-4
            w-4
            opacity-50 cursor-pointer
        " onClick={() => setOpen((prev) => !prev)} />

                {onOpen && (
                    <div
                        className="
                absolute
                top-full
                left-0
                mt-1
                w-full
                z-50
                rounded-md
                border
                bg-white
                shadow-lg
                overflow-hidden
            "
                    >
                        <Command>
                            <CommandList className="max-h-64 overflow-y-auto">
                                <CommandEmpty>No product found.</CommandEmpty>

                                <CommandGroup>
                                    {filteredProducts?.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={`${product.friendlyName} ${product.brand}`}
                                            onSelect={() => {
                                                updateField("itemId", product.id);

                                                setSearch(product.friendlyName);

                                                setOpen(false);
                                            }}
                                            className="
                                    flex
                                    cursor-pointer
                                    items-center
                                    justify-between
                                "
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-black">
                                                    {product.friendlyName}
                                                </span>

                                                <span className="text-xs text-gray-600">
                                                    {product.brand} · {product.categoryId}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )}
            </div>
            {/* BOTÃO */}
            <Button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="
            bg-blue-600
            text-white
            hover:bg-blue-700
            h-11
            shrink-0
        "
            >
                <Plus className="h-4 w-4 mr-1" />
                Add new
            </Button>
        </div>
    );
}