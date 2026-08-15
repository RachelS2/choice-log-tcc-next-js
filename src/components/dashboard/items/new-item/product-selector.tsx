import { useEffect, useState } from 'react';
import { Plus, ArrowDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useGetUserProducts } from '@/hooks/use-products';
import { toast } from 'sonner';
import { AddNewExperienceFormModel } from '@/models/dashboard/experiences';
import { Input } from '@/components/ui/input';
import NewItemModal from './new-item-form-modal';
import { getItemsController } from '@/lib/controller/item-controller';
import { ItemDisplayModel } from '@/models/dashboard/items';


interface ProductSelectorProps {
    updateField: <K extends keyof AddNewExperienceFormModel>(field: K, value: AddNewExperienceFormModel[K]) => void;
    itemType: "product" | "service";
}

export default function ProductSelector({
    updateField,
    itemType = "product",
}: ProductSelectorProps) {
    const [onOpen, setOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [search, setSearch] = useState("");
     const [catalogItems, setCatalogItems] = useState<ItemDisplayModel[]>([]);
    useEffect(() => {
        const fetchCatalogItems = async () => {
            try {
                const cats = await getItemsController();
                setCatalogItems(cats);
                console.log(cats);
            } 
            
            catch (error) {
                toast.error('Failed to fetch catalog items');
            }
        };

        fetchCatalogItems();
    }, []);


    const filteredProducts = catalogItems?.filter((product) =>
        `${product.friendlyName} ${product.brand}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

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
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    placeholder="Search and select a product..."
                    className="pr-10"
                />

                <ArrowDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 cursor-pointer"
                    onClick={() => setOpen((prev) => !prev)}
                />

                {onOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full z-50 rounded-md border bg-white shadow-lg overflow-hidden">
                        <Command>
                            <CommandList className="max-h-80 overflow-y-auto">
                                <CommandEmpty>{loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        <span>Loading...</span>
                                    </>
                                ) :
                                    "No product found."}</CommandEmpty>

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
                                            className="flex cursor-pointer items-center justify-between"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-black">
                                                    {product.friendlyName}
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    {product.brand} · {product.category.}
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

            <Button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="bg-blue-600 text-white hover:bg-blue-700 h-11 shrink-0"
            >
                <Plus className="h-4 w-4 mr-1" />
                Add new
            </Button>

            <NewItemModal
                open={addModalOpen}
                onOpenChange={setAddModalOpen}
                onSuccess={(item) => {
                    // 👉 INTEGRAR COM O BANCO DEPOIS:
                    console.log(item);

                    // UX melhor: já seleciona automaticamente
                    updateField("itemId", "novo-id-aqui");
                    setSearch(item.friendlyName);
                }}
            />
        </div>
    );
}