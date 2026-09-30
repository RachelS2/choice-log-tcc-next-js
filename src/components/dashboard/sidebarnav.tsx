"use client";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Settings,
  ShoppingCart,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">

      {/* Dashboard */}
      {buildMenuOption(pathname, "/dashboard", "Dashboard", LayoutDashboard)}

      {/* Itens */}
      {buildMenuOption(pathname, "/dashboard/items", "Itens", Box)}

      {/* Experiences */}
      {buildMenuOption(pathname, "/dashboard/experiences", "Experiências", ClipboardList)}

      {/* Analytics */}
      {buildMenuOption(pathname, "/dashboard/analytics", "Análises", BarChart3)}

      {/* Wish List */}
      {/* {buildMenuOption(pathname, "/dashboard/wishlist", "Lista de Desejos", ShoppingCart)} */}

      {/* Settings */}
      {buildMenuOption(pathname, "/dashboard/settings", "Configurações", Settings)}

    </nav>
  );
}

function buildMenuOption(pathname: string, href: string, label: string, Icon: React.ComponentType<{ className?: string }>) {
  const getIsActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        getIsActive(href)
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )

}