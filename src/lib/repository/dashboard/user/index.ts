"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateUserProfileDTO, UserCompleteDTO } from "@/models/user";
import { IncomeRange } from "../../../../../generated/prisma";
import { authClient } from "@/lib/auth-client";
import { ChangePasswordSchemaType, ResetPasswordSchemaType } from "@/zod-schemas/user-settings";

export async function fetchUserProfile(): Promise<UserCompleteDTO | null> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            name: true,
            image: true,
            email: true,
            emailVerified: true,
            incomeRange: true,
            createdAt: true,
            updatedAt: true,

        },
    });

    if (!user) {
        return null;
    }
    return {
        id: session.user.id,
        name: user.name || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        image: user.image || null,
        email: user.email || '',
        emailVerified: user.emailVerified || false,
        incomeRange: user.incomeRange as IncomeRange,
    };
}

export async function updateUserProfile(
    profile: UpdateUserProfileDTO
): Promise<{
    success: boolean;
    message: string;
}> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    try {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name: profile.name,
                image: profile.image,
                email: profile.email,
                updatedAt: new Date(),
                incomeRange: profile.incomeRange,
            },
        });

        return {
            success: true,
            message: "Profile updated successfully",
        };
    } catch (error) {
        console.error("Update profile error:", error);

        return {
            success: false,
            message: "Unable to update profile",
        };
    }
}

export async function deleteUserAccount(): Promise<{
    success: boolean;
    message: string;
}> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }
    const userId = session.user.id;
    try {

        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return {
            success: true,
            message: "Account deleted successfully",
        };
    }

    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Unable to delete account",
        };
    }

}

export async function updatePassword(
    changePassword: ChangePasswordSchemaType
): Promise<{
    success: boolean;
    message: string;
}> {
    const session = await authClient.getSession();

    if (!session) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }
    try {
        await auth.api.changePassword({
            body: {
                currentPassword: changePassword.password,
                newPassword: changePassword.newPassword,
                revokeOtherSessions: true
            },
            headers: await headers()
        });

        return {
            success: true,
            message: "Password updated successfully.",
        };
    } catch {
        return {
            success: false,
            message: "Current password is incorrect.",
        };
    }
}
