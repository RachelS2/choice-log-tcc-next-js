"use client";
import { LayoutDashboard, ALargeSmall , Package, BarChart3, Settings, Gift } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Categories",
    icon: ALargeSmall ,
    href: "/dashboard/categories",
  },
  {
    label: "Products",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "Wish List",
    icon: Gift,
    href: "/dashboard/wishlist",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}