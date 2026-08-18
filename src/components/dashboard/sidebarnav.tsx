"use client";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  BarChart3,
  Settings,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  const isCatalogActive =
    pathname === "/dashboard/catalog" ||
    pathname.startsWith("/dashboard/catalog/");

  const [catalogOpen, setCatalogOpen] = useState(isCatalogActive);

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">

      {/* Dashboard */}
      {buildMenuOption(pathname, "/dashboard", "Dashboard", LayoutDashboard)}


      {/* Experiences */}
      {buildMenuOption(pathname, "/dashboard/experiences", "Experiences", ClipboardList)}

      {/* Catalog */}
      <div>
        <button
          type="button"
          onClick={() => setCatalogOpen((open) => !open)}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isCatalogActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          <Package className="h-4 w-4" />
          <span>Catalog</span>

          <ChevronRight
            className={cn(
              "ml-auto h-4 w-4 transition-transform",
              catalogOpen && "rotate-90"
            )}
          />
        </button>

        {catalogOpen && (
          <div className="ml-7 mt-1 space-y-1 border-l border-gray-200 pl-3">
            <Link
              href="/dashboard/catalog/items"
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                pathname === "/dashboard/catalog/items"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              Items
            </Link>

            <Link
              href="/dashboard/catalog/categories"
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                pathname === "/dashboard/catalog/categories"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              Categories
            </Link>
          </div>
        )}
      </div>

      {/* Analytics */}
      {buildMenuOption(pathname, "/dashboard/analytics", "Analytics", BarChart3)}

      {/* Wish List */}
      {buildMenuOption(pathname, "/dashboard/wishlist", "Wish List", ShoppingCart)}

      {/* Settings */}
      {buildMenuOption(pathname, "/dashboard/settings", "Settings", Settings)}

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