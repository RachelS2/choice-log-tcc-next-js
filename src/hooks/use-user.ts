import { UserCompleteDTO } from "@/models/user";
import { useAsyncData } from "./generic-hook";
import { fetchUserProfile } from "@/lib/repository/user-repository";


/**
 * Returns the profile (name, email, incomeRange, emailVerified, and photoUrl) of the authenticated user.
 */
export function useGetUserProfile(): {
    data: UserCompleteDTO | null;
    loading: boolean;
    error: Error | null;
    reload: () => Promise<void>;
} {
    return useAsyncData(
        async () => {
            return await fetchUserProfile();
        },
        null
    );
}