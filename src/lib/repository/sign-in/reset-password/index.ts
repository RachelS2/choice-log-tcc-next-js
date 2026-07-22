"use server";
import { authClient } from "@/lib/auth-client";
import { ResetPasswordSchemaType } from "@/zod-schemas/user-settings";

export async function resetPassword(
    data: ResetPasswordSchemaType, token: string
): Promise<{
    success: boolean;
    message: string;
}> {
    try {
        const { error } = await authClient.resetPassword({
            token,
            newPassword: data.newPassword,
        });

        if (error) {
            return {
                success: false,
                message: error.message || "Failed to reset password.",
            };
        }

        return {
            success: true,
            message: "Password reset successfully.",
        };
    }

    catch (error: any) {
        return {
            success: false,
            message: error || "An unexpected error occurred.",
        };
    }
}