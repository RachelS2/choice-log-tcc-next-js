
import { getUserAuthData } from "@/lib/utils";
import { useAsyncData } from "./generic-hook";
import { fetchItemBasicInfoRepository } from "@/lib/repository/item-repository";


export function useGetUserItens() {
    return useAsyncData(async () => {
        const user = await getUserAuthData();
        if (!user) return [];
        return fetchItemBasicInfoRepository(user.id);
    }, []);
}