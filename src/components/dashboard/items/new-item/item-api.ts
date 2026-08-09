import type { ItemIdModel, ItemModel, CategoryModel, ItemTypeEnum } from '../../../../models/dashboard/items';

// Mock categories data - in production this would come from the backend
const mockCategories: CategoryModel[] = [
    { id: 'cat-1', name: 'Beverages', itemTypeId: 1 },
    { id: 'cat-2', name: 'Electronics', itemTypeId: 1 },
    { id: 'cat-3', name: 'Food', itemTypeId: 1 },
    { id: 'cat-4', name: 'Clothing', itemTypeId: 1 },
    { id: 'cat-5', name: 'Health & Beauty', itemTypeId: 1 },
    { id: 'cat-6', name: 'Home & Garden', itemTypeId: 1 },
    { id: 'cat-7', name: 'Transportation', itemTypeId: 2 },
    { id: 'cat-8', name: 'Entertainment', itemTypeId: 2 },
    { id: 'cat-9', name: 'Education', itemTypeId: 2 },
    { id: 'cat-10', name: 'Healthcare', itemTypeId: 2 },
    { id: 'cat-11', name: 'Finance', itemTypeId: 2 },
    { id: 'cat-12', name: 'Fitness', itemTypeId: 2 },
];

// itemTypeId: 1 = PRODUCT, 2 = SERVICE
function getItemTypeId(type: ItemTypeEnum): number {
    return type === 'PRODUCT' ? 1 : 2;
}

export async function fetchCategories(type: ItemTypeEnum): Promise<CategoryModel[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    const typeId = getItemTypeId(type);
    return mockCategories.filter((c) => c.itemTypeId === typeId);
}

export async function postItem(item: ItemModel) {
    const response = await fetch("/api/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("UNIQUE_CONSTRAINT_VIOLATION");
        }

        throw new Error("FAILED_TO_CREATE_ITEM");
    }

    return response.json();
}