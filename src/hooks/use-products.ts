
import { fetchUserProducts } from "@/lib/repository/dashboard/products";
import { getUserIdServer } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";


export function useGetUserProducts() {
    return useAsyncData(async () => {
        const userId = await getUserIdServer();
        return fetchUserProducts(userId);
    }, []);
}