
import { auth } from "@/lib/auth";
import { useAsyncData } from "./generic-hook";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { ItemTypeEnum } from "@/models/dashboard/items";
import { headers } from "next/headers";



/**
 * Returns all categories associated with the authenticated user.
 */
export function useGetCategories(type?: ItemTypeEnum) {
    return useAsyncData(async () => {
        const user = await auth.api.getSession({
    headers: await headers(),
});
        if (!user) return [];
        return fetchCategoriesRepository(user.user.id, type);
    }, []);
}
