"use client";

import { useState } from "react";
import {
    PanelLeftClose,
    PanelLeftOpen,
    ShoppingBag,
} from "lucide-react";

import AppLogo from "@/components/ui/choicelog-app-logo";
import UserIcon from "@/components/ui/choicelog-user-icon";
import { SidebarNav } from "@/components/dashboard/sidebarnav";
import { Button } from "../ui/button";

interface SidebarShellProps {
    session: {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    };
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function SidebarShell({
    session,
    isCollapsed,
    onToggle,
}: SidebarShellProps) {

    const userName = session.user.name ?? "Usuário";
    const userEmail = session.user.email ?? "";

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-40
        flex h-dvh w-[72px] flex-col
        border-r border-gray-200 bg-white
        transition-[width] duration-200
        ${isCollapsed
                    ? "lg:w-[72px]"
                    : "lg:w-64"
                }
      `}
        >
            {/* HEADER */}
            <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-200 px-3 lg:justify-between">

                {/* Logo completo - desktop expandido */}
                {!isCollapsed && (
                    <div className="hidden min-w-0 flex-1 lg:block">
                        <AppLogo
                            href="/dashboard"
                            textColor="text-gray-900"
                        />
                    </div>
                )}

                {/* Ícone compacto - mobile ou desktop recolhido */}
                <div
                    className={`
            flex size-9 shrink-0 items-center justify-center
            rounded-xl bg-blue-700
            ${isCollapsed
                            ? "lg:flex"
                            : "lg:hidden"
                        }
          `}
                >
                    <ShoppingBag className="size-4 text-white" />
                </div>
            </div>

            {/* NAVEGAÇÃO */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {/* Mobile sempre recolhido */}
                <div className="lg:hidden">
                    <SidebarNav collapsed={true} />
                </div>

                {/* Desktop acompanha o estado */}
                <div className="hidden lg:block">
                    <SidebarNav collapsed={isCollapsed} />
                </div>
            </div>

            {/* RODAPÉ */}
            <div className="shrink-0 border-t border-gray-200 p-3">

                {/* Mobile: somente avatar */}
                <div className="flex justify-center lg:hidden">
                    <UserIcon
                        name={userName}
                        image={session.user.image}
                        className="size-9 shrink-0"
                    />
                </div>

                {/* Desktop */}
                <div
                    className={`
            hidden lg:flex
            ${isCollapsed
                            ? "flex-col items-center gap-3"
                            : "items-center gap-3"
                        }
          `}
                >
                    <UserIcon
                        name={userName}
                        image={session.user.image}
                        className="size-9 shrink-0"
                    />

                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                                {userName}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                {userEmail}
                            </p>
                        </div>
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={
                            isCollapsed ? "Expandir sidebar" : "Recolher sidebar"
                        }
                        onClick={onToggle}
                        className="hidden lg:flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-600 shadow-none hover:bg-gray-100"
                    >
                        {isCollapsed ? (
                            <PanelLeftOpen className="size-4" />
                        ) : (
                            <PanelLeftClose className="size-4" />
                        )}
                    </Button>
                </div>
            </div>
        </aside>
    );
}