"use client";

import { useState } from "react";
import SidebarShell from "@/components/dashboard/sidebar-shell";

interface DashboardShellProps {
    session: React.ComponentProps<typeof SidebarShell>["session"];
    children: React.ReactNode;
}

export default function DashboardShell({
    session,
    children,
}: DashboardShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-dvh">
            <SidebarShell
                session={session}
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed((prev) => !prev)}
            />

            <main
                className={`
          relative min-h-dvh min-w-0
          ml-[72px]
          transition-[margin-left] duration-200
          bg-gradient-to-br
          from-slate-50 via-blue-50 to-slate-100
          ${isCollapsed
                        ? "lg:ml-[72px]"
                        : "lg:ml-64"
                    }
        `}
            >
                {/* Efeitos visuais de fundo */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-24 left-1/4 h-[280px] w-[300px] rounded-full bg-blue-300/20 blur-3xl" />
                    <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-300/15 blur-3xl" />
                    <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-200/10 blur-2xl" />
                    <div className="absolute bottom-0 left-10 h-[280px] w-[260px] rounded-full bg-blue-200 blur-3xl" />
                    <div className="absolute bottom-[-40px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />
                </div>

                {/* Conteúdo das páginas */}
                <div className="relative z-10 min-w-0">
                    {children}
                </div>
            </main>
        </div>
    );
}