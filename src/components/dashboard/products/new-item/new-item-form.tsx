"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NewItemFormProps = {
    value: {
        name: string;
        brand: string;
        category: string;
    };
    categories: { id: string; friendlyName: string }[];
    onChange: (field: string, value: string) => void;
    onSubmit: () => void;
};

export default function NewItemForm({
    value,
    categories,
    onChange,
    onSubmit,
}: NewItemFormProps) {
    return (
        <form
            className="space-y-4 py-2"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div className="space-y-2">
                <Label>Product name</Label>
                <Input
                    value={value.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Brand</Label>
                <Input
                    value={value.brand}
                    onChange={(e) => onChange("brand", e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Category</Label>
                <Select
                    value={value.category}
                    onValueChange={(v) => onChange("category", v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                                {c.friendlyName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </form>
    );
}