import { Category } from "../../../../../generated/prisma";

export async function fetchUserCategories(userId: string): Promise<Category[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...await fetchUserProductsCategories(userId), ... await fetchUserServiceCategories(userId)];
}

export async function fetchUserProductsCategories(userId: string): Promise<Category[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            id: 'c-1', friendlyName: 'Camping Gear',
            systemName: "camping_gear",
            userId: process.env.RACHELBS_ID || "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        }
    ];
}

export async function fetchUserServiceCategories(userId: string): Promise<Category[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            id: 'c-2', friendlyName: 'IT Repair',
            systemName: "it_repair",
            userId: process.env.RACHELBS_ID || "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        }
    ];
}



export async function fetchSystemCategories(): Promise<Category[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...await fetchSystemProductsCategories(), ... await fetchSystemServiceCategories()];
}



export async function fetchSystemProductsCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            id: 'c-1', friendlyName: 'Electronics',
            systemName: "electronics",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },
        {
            id: 'c-2', friendlyName: 'Education',
            systemName: "education",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },
        {
            id: 'c-3', friendlyName: 'Food & Beverage',
            systemName: "food_and_beverage",

            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },

        {
            id: 'c-4', friendlyName: 'Beauty & Personal Care',
            systemName: "beauty_and_personal_care",

            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },
    ];

}

export async function fetchSystemServiceCategories(): Promise<Category[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            id: 'c-1', friendlyName: 'Transportation',
            systemName: "transportation",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
        {
            id: 'c-2', friendlyName: 'Education',
            systemName: "education",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
        {
            id: 'c-3', friendlyName: 'Culture & Entertainment',
            systemName: "culture_and_entertainment",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
        {
            id: 'c-4', friendlyName: 'Beauty & Personal Care',
            systemName: "beauty_and_personal_care",

            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },

        {
            id: 'c-5', friendlyName: 'Health, Sports & Wellness',
            systemName: "health_sports_and_wellness",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
    ];
}


