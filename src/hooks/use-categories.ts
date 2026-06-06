
import { fetchSystemCategories, fetchSystemProductsCategories, fetchSystemServiceCategories, fetchUserCategories, fetchUserProductsCategories, fetchUserServiceCategories } from "@/lib/repository/dashboard/categories";
import { getUserAuthData } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";



/**
 * Returns all categories associated with the authenticated user.
 */
export function useGetUserCategories() {
    return useAsyncData(async () => {
        const user = await getUserAuthData();
        if (!user) return [];
        return fetchUserCategories(user.id);
    }, []);
}
/**
 * Returns all PRODUCT categories registered by an USER.
 */

export function useGetUserProductsCategories() {
    return useAsyncData(async () => {
        const user = await getUserAuthData();
        if (!user) return [];

        return fetchUserProductsCategories(user.id);
    }, []);
}

/**
 * Returns all SERVICE categories registered by an USER.
 */
export function useGetUserServicesCategories() {
    return useAsyncData(async () => {
        const user = await getUserAuthData();
        if (!user) return [];

        return fetchUserServiceCategories(user.id);
    }, []);
}

/**
 * Returns ALL the categories registered by the SYSTEM.
 */

export function useGetSystemCategories() {
    return useAsyncData(async () => {
        return fetchSystemCategories();
    }, []);
}


/**
 * Returns all PRODUCT categories registered by the SYSTEM.
 */

export function useGetSystemProductsCategories() {
    return useAsyncData(async () => {
        return fetchSystemProductsCategories();
    }, []);
}


/**
 * Returns all SERVICE categories registered by the SYSTEM.
 */

export function useGetSystemServicesCategories() {
    return useAsyncData(async () => {
        return fetchSystemServiceCategories();
    }, []);
}