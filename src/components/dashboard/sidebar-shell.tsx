"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, ShoppingBag } from "lucide-react";

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
}

export default function SidebarShell({ session }: SidebarShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarWidth = isCollapsed ? 72 : 256;
    const userName = session.user.name ?? "Usuário";
    const userEmail = session.user.email ?? "";

    return (
        <aside
            className="relative flex h-screen shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-200"
            style={{ width: sidebarWidth }}
        >
            <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-3">
                {!isCollapsed && (
                    <div className="min-w-0 flex-1">
                        <AppLogo href="/dashboard" textColor="text-gray-900" />
                    </div>
                )}

                {isCollapsed && (
                    <div className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-700">
                        <ShoppingBag className="h-4 w-4 text-white" />
                    </div>
                )}


            </div>

            <div className="flex-1 overflow-hidden">
                <SidebarNav collapsed={isCollapsed} />
            </div>

            <div className="border-t border-gray-200 p-3">
                <div
                    className={
                        isCollapsed
                            ? "flex flex-col items-center gap-3"
                            : "flex items-center gap-3"
                    }
                >
                    <UserIcon
                        name={userName}
                        image={session.user.image}
                        className={
                            isCollapsed
                                ? "size-9 shrink-0"
                                : "size-9 shrink-0"
                        }
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
                            isCollapsed
                                ? "Expandir sidebar"
                                : "Recolher sidebar"
                        }
                        onClick={() => setIsCollapsed((current) => !current)}
                        className="size-9 shrink-0 cursor-pointer rounded-lg text-gray-600 shadow-none hover:bg-gray-100"
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
