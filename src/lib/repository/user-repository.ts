"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateUserProfileDTO, UserCompleteDTO } from "@/models/user";
import { IncomeRange } from "../../../generated/prisma";
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
            message: "Perfil atualizado com sucesso.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Não foi possível atualizar o perfil.",
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
            message: "Conta excluída com sucesso.",
        };
    }

    catch (error) {
        return {
            success: false,
            message: "Não foi possível excluir a conta.",
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
            message: "Não autorizado",
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
            message: "Senha atualizada com sucesso.",
        };
    } catch {
        return {
            success: false,
            message: "Senha atual incorreta.",
        };
    }
}

export async function resetPassword(
    data: ResetPasswordSchemaType,
    token: string
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
                message: error.message || "Falha ao redefinir a senha.",
            };
        }

        return {
            success: true,
            message: "Senha redefinida com sucesso.",
        };
    } catch (error: unknown) {
        console.error("Erro original ao redefinir senha:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Ocorreu um erro inesperado.",
        };
    }
}