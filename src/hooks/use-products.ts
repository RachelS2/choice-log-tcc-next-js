
import { fetchUserProducts } from "@/lib/repository/dashboard/products";
import { getUserAuthData } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";


export function useGetUserProducts() {
    return useAsyncData(async () => {
        const user = await getUserAuthData();
        if (!user) return [];
        return fetchUserProducts(user.id);
    }, []);
}