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
            id: '1', friendlyName: 'Camping Gear',
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
            id: '2', friendlyName: 'IT Repair',
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
            id: '3', friendlyName: 'Electronics',
            systemName: "electronics",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },
        {
            id: '4', friendlyName: 'Education',
            systemName: "education",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },
        {
            id: '5', friendlyName: 'Food & Beverage',
            systemName: "food_and_beverage",

            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "PRODUCT"
        },

        {
            id: '6', friendlyName: 'Beauty & Personal Care',
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
            id: '7', friendlyName: 'Transportation',
            systemName: "transportation",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
        {
            id: '8', friendlyName: 'Education',
            systemName: "education",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
        {
            id: '9', friendlyName: 'Culture & Entertainment',
            systemName: "culture_and_entertainment",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
        {
            id: '10', friendlyName: 'Beauty & Personal Care',
            systemName: "beauty_and_personal_care",

            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },

        {
            id: '11', friendlyName: 'Health, Sports & Wellness',
            systemName: "health_sports_and_wellness",
            userId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "SERVICE"
        },
    ];
}


