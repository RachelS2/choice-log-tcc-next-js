import { useAsyncData } from "./generic-hook";
import { fetchUserProfile } from "@/lib/repository/dashboard/user";


/**
 * Returns the profile (name, email, incomeRange, emailVerified, and photoUrl) of the authenticated user.
 */
export function useGetUserProfile() {
    return useAsyncData(
        async () => {
            return await fetchUserProfile();
        },
        null
    );
}