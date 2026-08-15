
import { getUserAuthData } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { ItemTypeEnum } from "@/models/dashboard/items";



/**
 * Returns all categories associated with the authenticated user.
 */
export function useGetCategories(type?: ItemTypeEnum) {
    return useAsyncData(async () => {
        const user = await getUserAuthData();
        if (!user) return [];
        return fetchCategoriesRepository(user.id, type);
    }, []);
}
