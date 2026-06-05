import { UserProfileViewDTO } from "@/models/user";
import { useAsyncData } from "./generic-hook";
import { fetchUserProfile } from "@/lib/repository/dashboard/user";


/**
 * Returns the profile (name, email, incomeRange, emailVerified, and photoUrl) of the authenticated user.
 */
export function useGetUserProfile(): {
    data: UserProfileViewDTO | null;
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