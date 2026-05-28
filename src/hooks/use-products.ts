
import { fetchUserProducts } from "@/lib/repository/dashboard/products";
import { getUserId } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";


export function useGetUserProducts() {
    return useAsyncData(async () => {
        const userId = await getUserId();
        return fetchUserProducts(userId);
    }, []);
}