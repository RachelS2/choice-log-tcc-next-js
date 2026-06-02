
import { fetchSystemCategories, fetchSystemProductsCategories, fetchSystemServiceCategories, fetchUserCategories, fetchUserProductsCategories, fetchUserServiceCategories } from "@/lib/repository/dashboard/categories";
import { getUserIdServer } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";



/**
 * Returns all categories associated with the authenticated user.
 */
export function useGetUserCategories() {
    return useAsyncData(async () => {
        const userId = await getUserIdServer();

        return fetchUserCategories(userId);
    }, []);
}
/**
 * Returns all PRODUCT categories registered by an USER.
 */

export function useGetUserProductsCategories() {
    return useAsyncData(async () => {
        const userId = await getUserIdServer();

        return fetchUserProductsCategories(userId);
    }, []);
}

/**
 * Returns all SERVICE categories registered by an USER.
 */
export function useGetUserServicesCategories() {
    return useAsyncData(async () => {
        const userId = await getUserIdServer();

        return fetchUserServiceCategories(userId);
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