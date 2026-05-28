import { Item } from "../../../../../generated/prisma";

export async function fetchUserProducts(userId: string): Promise<Item[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return SEED_PRODUCTS;

}

const SEED_PRODUCTS: Item[] = [
    {
        id: 'p-1', friendlyName: 'AirPods Pro (2nd gen)', brand: 'Apple', categoryId: "1",
        systemName: "airpods_pro_2nd_gen",
        type: "PRODUCT",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: null
    },
    {
        id: 'p-2', friendlyName: 'Kindle Paperwhite', brand: 'Amazon', categoryId: "2",
        systemName: "kindle_paperwhite",
        type: "PRODUCT",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: null
    },
    {
        id: 'p-3', friendlyName: 'Nespresso Vertuo Plus', brand: 'Nespresso', categoryId: "3",
        systemName: "nespresso_vertuo_plus",
        type: "PRODUCT",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: null
    },
    {
        id: 'p-4', friendlyName: 'V15 Detect Cordless Vacuum', brand: 'Dyson', categoryId: "3",
        systemName: "dyson_v15_detect",
        type: "PRODUCT",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: null
    },
    {
        id: 'p-5', friendlyName: 'WH-1000XM5 Headphones', brand: 'Sony', categoryId: "2",
        systemName: "sony_wh-1000xm5",
        type: "PRODUCT",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: null
    },
    {
        id: 'p-6', friendlyName: 'Instant Pot Duo 7-in-1', brand: 'Instant Pot', categoryId: "3",
        systemName: "instant_pot_duo_7-in-1",
        type: "PRODUCT",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl
            : null
    },
];